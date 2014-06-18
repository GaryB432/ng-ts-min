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

module Data {
    export interface IPosition extends Dto.IPosition {
        IsSelected: boolean;
        md5: string;
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

interface Imd5 { createHash(input: string): string; }

class PositionService {
    private positions: Data.IPosition[] = [];

    constructor(private $q: ng.IQService, private md5: Imd5, private dataService: DataServices.Position) { }

    private TranslateDtoToData(position: Dto.IPosition): Data.IPosition {
        var dataPosition = <Data.IPosition>position;
        dataPosition.IsSelected = position.IsSelectable && position.Symbol == 'F';
        dataPosition.md5 = this.md5.createHash(position.Symbol);
        return dataPosition;
    }

    getPositions(): ng.IPromise<Data.IPosition[]> {
        var getPositions = this.$q.defer<Dto.IPosition[]>();
        this.dataService.getPositions().then((response) => {
            var totals = response.data.includesTotal ? response.data.positions.pop() : null;
            return getPositions.resolve(this.positions = response.data.positions.map((p) => this.TranslateDtoToData(p)));
        });
        return getPositions.promise;
    }
}

angular.module('app.services', ['angular-md5'])
    .service('DataServices.Todo', ['$http', DataServices.Todo])
    .service('DataServices.Position', ['$http', DataServices.Position])
    .service('TodoService', ['$q', 'DataServices.Todo', TodoService])
    .service('PositionService', ['$q', 'md5', 'DataServices.Position', PositionService]);
