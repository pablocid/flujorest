'use strict';

angular.module('flujorestApp')
  .directive('inputTextSchm', function ($compile) {
    return {
      templateUrl: 'app/directives/inputTextSchm/inputTextSchm.html',
      restrict: 'EA',
      scope:{
        schema:'='
      },
      link: function (scope, element, attrs) {
        function setInput(){
          var label = element.find('label');

          if(attrs.labelText){
            label.text(attrs.labelText);
          }else{
            label.text(scope.schema.path);
          }

          var input = element.find('input');
          var inputName = attrs.name || scope.schema.path;
          input.attr('name',inputName);
          input.attr('ng-model',attrs.model);

          var p = element.find('p');
          if(scope.schema.isRequired && attrs.for){
            input.attr('required',true);
            p.attr('ng-show',attrs.for+'.'+inputName+'.$invalid && !'+attrs.for+'.'+inputName+'.$pristine');
            if(attrs.requiredText){
              p.text(attrs.requiredText);
            }
          }else{
            p.css('display','none');
          }

          var group = element.find('div');
          $compile(group)(scope.$parent);
        }
        if(!scope.schema){
          var i=0;
          scope.$watch('schema',function(s){
            if(s && i===0){ setInput(); i++;}
          });
        }else{
          setInput();
        }

      }
    };
  });
