'use strict';

angular.module('flujorestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'BlogCtrl'
      });
  });
