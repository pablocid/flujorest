'use strict';
/**
 * @ngdoc directive
 * @name flujorestApp.directive:formSchema
 * @element
 * @scope
 * @restrict EA
 *  @description
 *  Crea un formulario completo al pasarle un schema desde mongodb
 * <pre>
 formConfig = {
      formTextContent:{
        mainTitle:"Entrada de Blog",
        submitBtn:"Enviar el formulario"
      },
      name:{
        labelText:"Nombresillo",
        requiredText:"Pon el campo oe",
        order:1
      }
      properties:{
        order:5,
        titleArray:"Propiedades del documento",
        addItemToArray:"Agrega una nueva propiedad",
        deleteArrayItemBtn:"Borra esta propiedad",
        name:{
          labelText:"Nombre dentro de una propiedad",
          requiredText:"No seay choclo",
          order:1
        }
      }
    };
 *</pre>
 *
 */
angular.module('flujorestApp')
  .directive('formSchema', function ($compile,SchemaToForm) {
    return {
      restrict: 'EA',
      templateUrl:'app/directives/formSchema/formSchema.html',
      scope:{
        schema:'=',
        model:'=',
        submit:'&',
        config:'=',
        htmlFuncs:'='
      },
      link: function (scope, element) {
        var compose = function() {
          var funcs = arguments;
          return function() {
            var args = arguments;
            for (var i = funcs.length; i --> 0;) {
              args = [funcs[i].apply(this, args)];
            }
            return args[0];
          };
        };
        var makeForm = compose(
          SchemaToForm.compileToScope($compile,element, scope),
          SchemaToForm.schmToForm(element),
          SchemaToForm.setInput(scope.htmlFuncs, element),
          SchemaToForm.orderInputs(scope.config),
          SchemaToForm.setAttrs,
          SchemaToForm.schemaToArray
        );
        scope.schema.$promise.then(makeForm);
      }
    };
  });
