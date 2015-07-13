(function () {

    'use strict';

    var reverseUrl;
    var $route;
    var routeMock = {};

    routeMock.routes = {
        '/testRoute1/': {
            controller: 'TestController1',
            originalPath: '/test-route-1/'
        },
        '/testRoute1/:params/': {
            controller: 'TestController1',
            originalPath: '/test-route-1/:param/'
        },
        '/testRoute2/': {
            name: 'TestRoute2',
            originalPath: '/test-route-2/'
        },
        '/testRoute2/:params/': {
            name: 'TestRoute2',
            originalPath: '/test-route-2/:param/'
        },
    };

    describe('Unit: angular-reverse-url', function () {

        beforeEach(module('angular-reverse-url', function ($provide) {
            $provide.value('$route', routeMock);
        }));

        describe('reverseUrl filter', function () {

            beforeEach(inject(function ($injector) {
                $route = $injector.get('$route')
                reverseUrl = $injector.get('$filter')('reverseUrl');
            }));

            it('should correctly match to a basic route by controller', function () {
                expect(reverseUrl('TestController1')).toEqual('#/test-route-1/');
            });

            it('should correctly match to a basic route by name', function () {
                expect(reverseUrl('TestRoute2')).toEqual('#/test-route-2/');
            });

            it('should correctly match to a route by controller with params', function () {
                expect(reverseUrl('TestController1', {param: 'foobar'})).toEqual('#/test-route-1/foobar/');
            });

            it('should correctly match to a route by name with params', function () {
                expect(reverseUrl('TestRoute2', {param: 'foobar'})).toEqual('#/test-route-2/foobar/');
            });

            it('should return the empty string if the route does not match', function () {
                expect(reverseUrl('MissingController')).toEqual('');
            });

        });

    });

}());
