interface ITodo {
    text: string;
    done: boolean;
}

interface ITodoScope extends ng.IScope {
    todos: ITodo[];
    todoText: string;
    addTodo(): void;
    remaining(): number;
    archive(): void;
}

angular.module('app', ['ngRoute', 'app.services', 'app.controllers'])
    .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', { templateUrl: 'templates/main.html', controller: 'TodoCtrl' })
            .when('/about', { templateUrl: 'templates/about.html' })
            .otherwise({ redirectTo: '/' });
    }]);