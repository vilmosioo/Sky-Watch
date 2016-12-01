/// <reference path="../../../typings/index.d.ts" />

module SkyWatch.Directives {

    interface  IIsLoading extends ng.IScope {
        handler: Function;
    }

    export var isLoading: ng.Injectable<ng.IDirectiveFactory> = () => ({
        template: '<div ng-show="more" ng-class="{isloading:flag}" class="loadmore clear" data-test="load-more"><a>Load more</a><span class="loader"></span></div>',
        replace: true,
        restrict: 'E',
        scope: {
            flag : '=',
            handler: '=',
            more: '='
        },
        link: function($scope: IIsLoading, elem: ng.IAugmentedJQuery){
            if (typeof $scope.handler === 'function'){
                elem.bind('click', () => $scope.handler());
                $scope.$on('$destroy', () => elem.unbind('click', () => $scope.handler()));
            }
        }
    })
}