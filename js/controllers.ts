interface ITodoScope extends ng.IScope {
    todos: Dto.ITodo[];
    todoText: string;
    addTodo(): void;
    remaining(): number;
    archive(): void;
}
interface IPositionsScope extends ng.IScope {
    positions: Data.IPosition[];
}
class TodoCtrl {
    constructor($scope: ITodoScope, todoService: TodoService) {
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
class PositionsCtrl {
    constructor($scope: IPositionsScope, positionService: PositionService) {
        positionService.getPositions().then((r) => $scope.positions = r);
    }
}

angular.module('app.controllers', [])
    .controller('TodoCtrl', ['$scope', 'TodoService', TodoCtrl])
    .controller('PositionsCtrl', ['$scope', 'PositionService', PositionsCtrl]);
 