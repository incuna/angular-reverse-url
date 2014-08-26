(function () {

    'use strict';

    var reverseUrl;
    var $route;
    var routeMock = { routes: {} };

    describe('Unit: angular-reverse-url', function () {

        beforeEach(module('angular-reverse-url', function ($provide) {
            $provide.value('$route', routeMock);
        }));

        describe('reverseUrl filter', function () {

            beforeEach(inject(function ($injector) {
                $route = $injector.get('$route');
                reverseUrl = $injector.get('$filter')('reverseUrl');
            }));

            it('should match a basic route by controller', function () {
                routeMock.routes = {
                    '/testRoute/': {
                        controller: 'TestController',
                        originalPath: '/test-route/'
                    }
                };
                expect(reverseUrl('TestController')).toEqual('#/test-route/');
            });

            it('should match a basic route by name', function () {
                routeMock.routes = {
                    '/testRoute/': {
                        name: 'TestRoute',
                        originalPath: '/test-route/'
                    }
                };
                expect(reverseUrl('TestRoute')).toEqual('#/test-route/');
            });

            it('should match a route by name when name and controller are specified', function () {
                routeMock.routes = {
                    '/testRoute1/': {
                        name: 'TestRoute',
                        controller: 'TestController',
                        originalPath: '/test-route/'
                    }
                };
                expect(reverseUrl('TestRoute')).toEqual('#/test-route/');
            });

            it('should match a route with params by controller', function () {
                routeMock.routes = {
                    '/testRoute/:params/': {
                        controller: 'TestController',
                        originalPath: '/test-route/:param/'
                    }
                };
                expect(reverseUrl('TestController', {param: 'foobar'})).toEqual('#/test-route/foobar/');
            });

            it('should match a route with params by name', function () {
                routeMock.routes = {
                    '/testRoute/:params/': {
                        name: 'TestRoute',
                        originalPath: '/test-route/:param/'
                    }
                };
                expect(reverseUrl('TestRoute', {param: 'foobar'})).toEqual('#/test-route/foobar/');
            });

            it('should match a route with params by name when name and controller are specified', function () {
               routeMock.routes = {
                    '/testRoute/:params/': {
                        name: 'TestRoute',
                        controller: 'TestController',
                        originalPath: '/test-route/:param/'
                    }
                };
                expect(reverseUrl('TestRoute', {param: 'foobar'})).toEqual('#/test-route/foobar/');
            });

        });

    });

}());
