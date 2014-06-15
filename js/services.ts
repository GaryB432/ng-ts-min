class TodoService {
    private todos = [
        { text: 'learn angular', done: true },
        { text: 'build an angular app', done: false },
        { text: 'create a service', done: false }
    ];

    getTodos(): ITodo[]{
        return this.todos;
    }
    addTodo(todo: ITodo) {
        this.todos.push(todo);
    }
    remaining() {
        var count = 0;
        angular.forEach(this.todos, function (todo: ITodo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    }
    archive() {
        var oldTodos = this.todos;
        this.todos = [];
        angular.forEach(oldTodos, (todo: ITodo) => {
            if (!todo.done) {
                this.todos.push(todo);
            }
        });
        return this.todos;
    }
} 

angular.module('app.services', []).service('TodoService', TodoService);