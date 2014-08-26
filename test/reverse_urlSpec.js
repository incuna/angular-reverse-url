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
        '/testRoute3/': {
            controller: 'TestController3',
            name: 'TestRoute3',
            originalPath: '/test-route-3/'
        },
        '/testRoute3/:params/': {
            controller: 'TestController3',
            name: 'TestRoute3',
            originalPath: '/test-route-3/:param/'
        }
    };

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
                expect(reverseUrl('TestController1')).toEqual('#/test-route-1/');
            });

            it('should match a basic route by name', function () {
                expect(reverseUrl('TestRoute2')).toEqual('#/test-route-2/');
            });

            it('should match a route by controller when name and controller are specified', function () {
                expect(reverseUrl('TestController3')).toEqual('#/test-route-3/');
            });

            it('should match a route with params by controller', function () {
                expect(reverseUrl('TestController1', {param: 'foobar'})).toEqual('#/test-route-1/foobar/');
            });

            it('should match a route with params by name', function () {
                expect(reverseUrl('TestRoute2', {param: 'foobar'})).toEqual('#/test-route-2/foobar/');
            });

            it('should match a route by with params controller when name and controller are specified', function () {
                expect(reverseUrl('TestController3', {param: 'foobar'})).toEqual('#/test-route-3/foobar/');
            });

        });

    });

}());
