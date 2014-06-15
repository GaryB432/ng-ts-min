
class TodoCtrl {
    constructor($scope: ITodoScope, todoService: TodoService) {
        'use strict';
        todoService.getTodos().then((todos) => $scope.todos = todos);

        $scope.addTodo = function () {
            todoService.addTodo({ text: $scope.todoText, done: false });
            $scope.todoText = '';
        };

        $scope.remaining = () => todoService.remaining();

        $scope.archive = function () {
            $scope.todos = todoService.archive();
        };
    }
}

angular.module('app.controllers', []).controller('TodoCtrl', ['$scope', 'TodoService', TodoCtrl]);
 