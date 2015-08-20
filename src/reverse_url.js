(function (angular, _) {
    'use strict';

    angular.module('angular-reverse-url', ['ngRoute'])
        .filter('reverseUrl', ['$route', '$location', function ($route, $location) {
            var regexp = /:([A-Za-z0-9]*)\\*?\\??/g;

            return _.memoize(function (name, params) {
                var targetRoute;
                angular.forEach($route.routes, function (route) {
                    if (route.controller === name || route.name === name) {

                        // we need to check we are passing the parameters in
                        var success = true;
                        var matches = regexp.exec(route.originalPath);

                        // we can't allow empty params if this route is expecting params
                        if ((matches !== null) && (matches.length > 0) && (angular.isUndefined(params) === true)) {
                            success = false;
                        }

                        // TODO: check params exist for each match

                        if (success === true) {
                            targetRoute = route.originalPath;
                            return;
                        }
                    }
                });
                if (angular.isUndefined(targetRoute)) {
                    return '';
                }
                targetRoute = targetRoute.replace(regexp, function (match, pattern) {
                    return params[pattern];
                });

                if (!$location.$$html5) {
                    targetRoute = '#'.concat(targetRoute);
                }

                return targetRoute;
            }, function (name, params) {
                return name + JSON.stringify(params);
            });
        }]);

}(window.angular, window._));
