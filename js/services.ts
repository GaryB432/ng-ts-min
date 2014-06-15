module DataServices {
    export interface IDataResponse {
    }
    export interface ITodoDataResponse extends IDataResponse {
        todos: Dto.ITodo[];
    }
    export interface IPositionDataResponse extends IDataResponse {
        positions: Dto.IPosition[];
        includesTotal: boolean;
    }

    export class JsonDataService {
        constructor(public $http: ng.IHttpService) { }
        getData(url: string, params?: any): ng.IHttpPromise<IDataResponse> {
            return this.$http({
                method: 'GET',
                url: '/data/' + url,
                params: params,
                headers: { 'Authorization': 'Token token=xxxxYYYYZzzz' }
            });
        }
    }
    export class Todo extends JsonDataService {
        constructor($http: ng.IHttpService) {
            super($http);
        }
        getTodos(): ng.IHttpPromise<ITodoDataResponse> { return this.getData('todos.json', { 'limit': 12, 'sortBy': 'created:desc' }); }
    }
    export class Position extends JsonDataService {
        constructor($http: ng.IHttpService) {
            super($http);
        }
        getPositions(): ng.IHttpPromise<IPositionDataResponse> { return this.getData('positions.json', { 'account': 'wtf' }); }
    }
}

module DtoExt {
    export interface IPosition extends Dto.IPosition {
        IsSelected: boolean;
    }
}

class TodoService {
    private todos: Dto.ITodo[] = [];

    constructor(private $q: ng.IQService, private dataService: DataServices.Todo) { }

    getTodos(): ng.IPromise<Dto.ITodo[]> {
        var getTodos = this.$q.defer<Dto.ITodo[]>();
        this.dataService.getTodos().then((response) => getTodos.resolve(this.todos = response.data.todos));
        return getTodos.promise;
    }

    addTodo(todo: Dto.ITodo) {
        this.todos.push(todo);
    }
    remaining() {
        var count = 0;
        angular.forEach(this.todos, function (todo: Dto.ITodo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    }
    archive() {
        var oldTodos = this.todos;
        this.todos = [];
        angular.forEach(oldTodos, (todo: Dto.ITodo) => {
            if (!todo.done) {
                this.todos.push(todo);
            }
        });
        return this.todos;
    }
}

class PositionService {
    private positions: DtoExt.IPosition[] = [];

    constructor(private $q: ng.IQService, private dataService: DataServices.Position) { }

    private static addIsSelected(position: Dto.IPosition): DtoExt.IPosition {
        var selectablePosition = <DtoExt.IPosition>position;
        selectablePosition.IsSelected = position.IsSelectable && position.Symbol == 'F';
        return selectablePosition;
    }

    getPositions(): ng.IPromise<DtoExt.IPosition[]> {
        var getPositions = this.$q.defer<Dto.IPosition[]>();
        this.dataService.getPositions().then((response) => {
            var totals = response.data.includesTotal ? response.data.positions.pop() : null;
            return getPositions.resolve(this.positions = response.data.positions.map((d) => PositionService.addIsSelected(d)));
        });
        return getPositions.promise;
    }
}

angular.module('app.services', [])
    .service('DataServices.Todo', ['$http', DataServices.Todo])
    .service('DataServices.Position', ['$http', DataServices.Position])
    .service('TodoService', ['$q', 'DataServices.Todo', TodoService])
    .service('PositionService', ['$q', 'DataServices.Position', PositionService]);
