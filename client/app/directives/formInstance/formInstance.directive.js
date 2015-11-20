'use strict';

angular.module('flujorestApp')
  .directive('formInstance', function ($http,$compile) {
    return {
      templateUrl: 'app/directives/formInstance/formInstance.html',
      restrict: 'EA',
      scope:{
        newReg:'=',
        section:'='
      },
      link: function (scope, element, attrs) {
        if(!Array.isArray(scope.newReg.properties)){
          scope.newReg.properties = [];
          scope.newReg.section = scope.section;
        }

        $http.get('/api/main/sections/section/'+scope.section).success(function (data) {
          //ope.schema=data;
          set(data);
        });

        function set(data){
          var inputsIndex = data.properties.map(function(a){return a.id;}).indexOf('inputs');
          //get the inputs from theme
          var form = element.find('form');
          var textInput = form.find('#text').clone();
          var optionList = form.find('#optionList').clone();
          var number = form.find('#number').clone();
          var html = form.find('#html').clone();
          var array = form.find('#array').clone();
          //clean de inputs from form
          form.empty();

          data.properties[inputsIndex].arrayMix.forEach(function (input) {
            var add;
            switch(input.type){
              case 'text':
                    var propIndex = scope.newReg.properties.push({id:input.name}) - 1;
                    add = textInput.clone();
                    add.find('input').attr({
                      type:'text',
                      required:input.required,
                      name:input.id,
                      'ng-model':"newReg.properties["+propIndex+"].string"
                    });
                    add.find('label').text(input.label);
                    break;
              case 'password':
                    var propIndex = scope.newReg.properties.push({id:input.name}) - 1;
                    add = textInput.clone();
                    add.find('input').attr({
                      type:'password',
                      required:input.required,
                      name:input.id,
                      'ng-model':"newReg.properties["+propIndex+"].string"
                    });
                    add.find('label').text(input.label);
                    break;
              case 'optionList':
                    var propIndex = scope.newReg.properties.push({id:input.name}) - 1;
                    add = optionList.clone();
                    add.find('select').attr({
                      required:input.required,
                      name:input.id,
                      'ng-model':"newReg.properties["+propIndex+"].string"
                    });
                    input.optionList.forEach(function (a) {
                      var opt = angular.element('<option value="'+ a+'">'+ a+'</option>');
                      add.find('select').append(opt);
                    });
                    add.find('label').text(input.label);
                    break;
              case 'email':
                    var propIndex = scope.newReg.properties.push({id:input.name}) - 1;
                    add = textInput.clone();
                    add.find('input').attr({
                      type:'email',
                      required:input.required,
                      name:input.id,
                      'ng-model':"newReg.properties["+propIndex+"].string"
                    });
                    add.find('label').text(input.label);
                    break;
            }
            form.append(add);
          });

          $compile(form)(scope);
        }
      }
    };
  });

/*[
 {"id":"input6414","main":"username","description":"Nombre de usuario","label":"Email","type":"text","optionList":[],"required":true},
 {"id":"input6864","main":"firstname","description":"Primer nombre","label":"Nombre","type":"text","optionList":[],"required":true},
 {"id":"input935","main":"lastname","description":"Apellido","label":"Apellido","type":"text","optionList":[],"required":true},
 {"id":"input1999","main":"address","description":"Dirección o Domicilio","label":"Domicilio","type":"text","optionList":[],"required":false},
 {"id":"input4204","main":"status","description":"Usuario activo","label":"Status","type":"boolean","optionList":[],"required":true},
 {"id":"input4257","main":"plan","description":"Plan contratado","label":"Suscripción","type":"text","optionList":[],"required":true}
]*/
