(function () {
    'use strict';

    angular.module('angular-reverse-url', ['ngRoute'])
        .filter('reverseUrl', ['$route', function ($route) {
            var regexp = /:([A-Za-z0-9]*)\\*?\\??/g;

            return _.memoize(function (controller, params) {
                var targetRoute;
                angular.forEach($route.routes, function (route) {
                    if (route.controller === controller) {
                        targetRoute = route.originalPath;
                        return false;
                    }
                });
                targetRoute = targetRoute.replace(regexp, function (match, pattern) {
                    return params[pattern];
                });
                return '#' + targetRoute;
            }, function (controller, params) {
                return controller + JSON.stringify(params);
            });
        }]);
}());
