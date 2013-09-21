//Articles service used for articles REST endpoint
angular.module('gameit.games').factory('Games', ['$resource', function($resource) {
    return $resource('/games/:gameId', {
        gameId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);