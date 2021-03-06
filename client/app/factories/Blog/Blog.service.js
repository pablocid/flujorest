'use strict';

angular.module('flujorestApp')
  .factory('Blog', function ($resource) {

    return $resource(
      '/api/blogs/:id',
      {id: '@_id'},
      {
        schema:{
          method:'GET',
          params:{id:'schema'}
        },
        update: {
          method: 'PUT'
        }
      }
    );
  });
