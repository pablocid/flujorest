'use strict';

angular.module('flujorestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('textContent', {
        url: '/text-content',
        templateUrl: 'app/textContent/textContent.html',
        controller: 'TextContentCtrl'
      });
  });
