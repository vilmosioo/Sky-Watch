/// <reference path="../../../typings/index.d.ts" />

module SkyWatch.Directives {
    export var card: ng.Injectable<ng.IDirectiveFactory> = () => ({
        templateUrl: '/views/templates/card.html',
        replace: true,
        restrict: 'E',
        scope: {
            item : '='
        }
    });
}