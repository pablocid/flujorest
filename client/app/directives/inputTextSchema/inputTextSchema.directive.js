'use strict';

angular.module('flujorestApp')
  .directive('inputTextSchema', function ($compile) {
    return {
      //templateUrl: 'app/directives/inputTextSchema/inputTextSchema.html',
      restrict: 'EA',
      scope:{
        schema:'='
      },
      compile:function(elementos, atributos){
        var model = atributos.model;
        console.log(atributos);
        var formName =atributos.for;

        var group = angular.element('<div />');
        group.addClass('form-group');

        var label = angular.element('<label />');
        label.text("Nombre");
        label.attr("for","name");

        var input = angular.element('<input />');
        input.attr('type','text');
        input.attr("name","name");
        input.attr('ng-model',model);
        input.addClass('form-control');

        var p = angular.element('<p />');
        p.addClass('help-block');
        p.text('Your name is required');

        group.append(label);
        group.append(input);
        group.append(p);

        elementos.append(group);

        return {
          pre:function(scope, element, attrs){

          },
          post: function (scope, element, attrs) {
            if(scope.schema.isRequired){
              input.attr('required',true);
              $compile(input)(scope);
            }
            var showWarning = formName+".name.$invalid && !"+formName+".name.$pristine";
            p.attr('ng-show',showWarning);
            $compile(p)(scope.$parent);

            //var input = element.find("input");
            //scope.name = scope.schema.path;

            /*
             console.log(attrs);
             scope.$watch('schema',function(s){
             if(s){ setInput(); }
             });
             scope.$watch('model',function(s){
             //console.log(scope.model);
             });
             function setInput (){

             scope.name = scope.schema.path;
             scope.required = scope.schema.isRequired;
             //var showWarning = scope.form+"."+scope.name+".$invalid && !"+scope.form+"."+scope.name+".$pristine";

             var group = angular.element('<div />');
             group.addClass('form-group');

             var label = angular.element('<label />');
             label.text("Nombre");
             label.attr("for","name");

             var input = angular.element('<input />');
             input.attr('type','text');
             input.attr("name","{{name}}");
             input.attr('ng-model',"model");
             input.attr('required',"{{required}}");
             input.addClass('form-control');

             var p = angular.element('<p />');
             p.addClass('help-block');
             p.text('Your name is required');
             //p.attr('ng-show',showWarning);

             group.append(label);
             group.append(input);
             group.append(p);

             //scope.validator = {'has-error' : scope.form[scope.name].$invalid && !scope.form[scope.name].$pristine };
             //console.log(scope.schema);
             /*
             var label = element.find('label');
             label.text(scope.schema.path);

             var input = element.find('input');
             scope.name = scope.schema.path;
             //input.attr('name',scope.schema.path);
             //input.attr('ng-model',scope.model);

             if(scope.schema.isRequired){
             input.attr('required',true);
             }

             if(scope.name==='named'){
             var group = element.find('div');
             var df = { 'has-error' : scope.form[scope.name].$invalid && !scope.form[scope.name].$pristine };
             group.attr('ng-class',df);
             }

             console.log(scope.form);


             //$compile(element)(scope)
             $compile(group)(scope);
             element.append(group);

             }*/
          }
        }
      }
    };
  });
