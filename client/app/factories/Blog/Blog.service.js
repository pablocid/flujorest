'use strict';

angular.module('flujorestApp')
  .factory('Blog', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return $resource(
      '/api/blogs/:id',
      {id: '@_id'},
      {
        schema:{
          method:'GET',
          params:{id:'schema'}
        }
      }
    );
  });
