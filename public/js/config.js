//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/create', {
            templateUrl: '/views/games/create.html'
        }).
        when('/:gameId/edit', {
            templateUrl: '/views/games/edit.html'
        }).
        when('/:gameId', {
            templateUrl: '/views/games/view.html'
        }).
        when('/', {
            templateUrl: '/views/games/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);