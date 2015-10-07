'use strict';

angular.module('flujorestApp')
  .factory('TextContent', function ($resource) {

    return $resource(
      '/api/text-content/:id',
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
