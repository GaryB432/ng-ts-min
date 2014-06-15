module DataServices {
    export interface IDataResponse {
    }
    export interface ITodoDataResponse extends IDataResponse {
        todos: Dto.ITodo[];
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

angular.module('app.services', [])
    .service('DataServices.Todo', ['$http', DataServices.Todo])
    .service('TodoService', ['$q', 'DataServices.Todo', TodoService]);