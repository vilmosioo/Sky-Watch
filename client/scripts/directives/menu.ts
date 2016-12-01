/// <reference path="../../../typings/index.d.ts" />

module SkyWatch.Directives {

    interface IMenuScope extends ng.IScope {
        menu: string[];
    }

    export var menu: ng.Injectable<ng.IDirectiveFactory> = () => ({
        templateUrl: '/views/templates/menu.html',
        replace: true,
        restrict: 'E',
        scope: {},
        controller: function($scope: IMenuScope){
            $scope.menu = [
                'Home',
                'Browse'
            ];
        }
    })
}