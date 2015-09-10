'use strict';

angular.module('flujorestApp')
  .directive('formSchema', function ($compile) {
    return {
      //templateUrl: 'app/directives/inputSchema/inputSchema.html',
      restrict: 'EA',
      //replace:true,
      scope:{
        schema:'=',
        model:'=',
        test:'=',
        config:'='
      },
      link: function (scope, element, attrs) {
        /*
        var sdf = angular.element("<h1 />");
        sdf.text("OIUOIUOIUOIUJNKJKSKJHD78697986876876");
        sdf.attr("id","123123");
        element.append(sdf);
        var wee=angular.element("<button />");
        wee.attr("ng-click","rrm()");
        wee.text("BORRAAAAAA");
        element.append(wee);
        $compile(wee)(scope);
        scope.rrm = function(){
          console.log("Borrando");
          console.log(element.find("#123123").remove());
        };
        */


        function setInputText(inputElement){
          var m = inputElement.modelString || inputElement.path;
          var s = inputElement.schmString || inputElement.path;
          var inputName = inputElement.inputName || false;

          var input = angular.element("<input-text-schm />");
          input.attr("schema","schema."+s); //texto
          input.attr("model","model."+m);// texto
          input.attr("for","formrandom");
          if(m&&s&&inputName){
            input.attr("name", inputName.split(".").join(""));
          }
          return input;
        }
        function setInputTextArea (inputElement){
          var d = angular.element('<text-angular />');
          d.attr('ng-model','model.'+inputElement.path);
          return d;
        }
        function setInputCheckbox (inputElement){
          var input = document.createElement('input');
          input.type = 'checkbox';
          input.className = 'form-control';
          input.setAttribute('ng-model','model.'+inputElement.path);
          return input;
        }
        function setInputDate (inputElement){
          scope.today = function() {
            scope.dt = new Date();
          };
          scope.today();

          scope.clear = function () {
            scope.dt = null;
          };

          // Disable weekend selection
          scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          scope.toggleMin = function() {
            scope.minDate = scope.minDate ? null : new Date();
          };
          scope.toggleMin();
          scope.maxDate = new Date(2020, 5, 22);
          scope.status = {
            opened: true
          };

          scope.open = function($event) {
            scope.status.opened = true;
            console.log(scope.status.opened);
          };

          scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          scope.format = scope.formats[0];


          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          var afterTomorrow = new Date();
          afterTomorrow.setDate(tomorrow.getDate() + 2);
          scope.events =
            [
              {
                date: tomorrow,
                status: 'full'
              },
              {
                date: afterTomorrow,
                status: 'partially'
              }
            ];

          scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i=0;i<scope.events.length;i++){
                var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                  return scope.events[i].status;
                }
              }
            }

            return '';
          };
          var d = angular.element(' <p class="input-group">' +
            '<input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="status.opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="false" close-text="Close" />' +
            '<span class="input-group-btn">' +
            '<button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
            '</span>' +
            '</p>' +
            '');

          var group = angular.element("<p />");
          group.addClass('input-group');

          var i = angular.element("<input />");
          i.attr("type","text");
          i.addClass('form-control');

          var span = angular.element("<span />");
          span.addClass('input-group-btn');

          var btn = angular.element('<button />');
          btn.attr('type','button');
          btn.attr('ng-click',"open($event)");

          var ip= angular.element('<i />');
          ip.addClass('glyphicon glyphicon-calendar');

          group.append(i);
          return group;
        }
        function setInputDate2(inputElement){
          var input = angular.element("<input-date-schm />");
          input.attr("schema","schema."+inputElement.path); //texto
          input.attr("model","model."+inputElement.path);// texto
          input.attr("for","formrandom");
          return input;
        }
        function setArrayInput(arrayInputElement){
          var group = angular.element("<div />");

          group.attr("id","props");
          var h3 = angular.element("<h3 />");
          h3.text(arrayInputElement.path);
          group.append(h3);

          var btn = angular.element("<button />");
          btn.text("Add item in "+arrayInputElement.path);
          btn.attr("ng-click","addInputs(schema."+arrayInputElement.path+")");
          group.append(btn);
          group.attr("ng-init","model."+arrayInputElement.path+"=[]");

          scope.addInputs(arrayInputElement);

          return group;
        }
        scope.addInputs = function(arrayInputElement){
          var group = angular.element("<div />");
          group.addClass("well");

          var posicion = 0;
          if(scope.model[arrayInputElement.path]){
            posicion = scope.model[arrayInputElement.path].length;
          }
          var idError = arrayInputElement.path+"_error";
          var idOk = arrayInputElement.path+"_"+posicion;
          group.attr("id",idOk);
          var toAddInputs = element.find("div#props");

          //busca en los elementos un id igual al agregado al group
          var ew =element.find("div#"+arrayInputElement.path+"_"+posicion);

          if( ew.length>0){
            if(element.find("#"+idError).length>0){return;}
            group.text("Llena primero el item anterior, madafaca");
            group.attr("id",idError);
            toAddInputs.append(group);
            return;
          }else{
            element.find("#"+idError).remove();
          }

          for(var p in arrayInputElement.schema.paths){
            arrayInputElement.schema.paths[p].modelString = arrayInputElement.path+"["+posicion+"]."+arrayInputElement.schema.paths[p].path;
            arrayInputElement.schema.paths[p].schmString = arrayInputElement.path+".schema.paths."+arrayInputElement.schema.paths[p].path;
            arrayInputElement.schema.paths[p].inputName = arrayInputElement.schema.paths[p].schmString+posicion;
            group.append(setInput(arrayInputElement.schema.paths[p]));
          }
          $compile(group)(scope);
          toAddInputs.append(group);
        };

        function setInput(inputElement){

          if(inputElement.instance=='String'&& inputElement.path=='content'){
            //return setInputTextArea(inputElement);
          }
          if(inputElement.instance=='String'){
            return setInputText(inputElement);
          }
          if(inputElement.instance=='Boolean'){
            //return setInputCheckbox(inputElement);
          }
          if(inputElement.instance=='Date'){
            //return setInputDate(inputElement);
            //return setInputDate2(inputElement);
          }

          return;
        }
        function setForm (sq){
          var formConfig = {
            name:{
              labelText:"Nombresillo",
              requiredText:"Pon el campo oe"
            }
          };
          for(var con in formConfig){
            if(sq[con]){
              angular.extend(sq[con],formConfig[con]);
            }
          }
          console.log(sq);
          //var frm  = document.createElement('form');
          var frm = angular.element('<form />');
          frm.attr('novalidate',true);
          frm.attr('ng-submit','submitForm()');
          frm.attr('name','formrandom');

          for(var m in sq){
            frm.append(setInput(sq[m]));
            if(sq[m].instance==='Array'){
              frm.append(setArrayInput(sq[m]));
            }
          }
          $compile(frm)(scope);
          element.append(frm);
        }

        scope.schema.$promise.then(setForm);


        //console.log(scope.schema);
        //console.log(form);
          //var el = angular.element('<input />');
        //var Data = angular.element('<datepicker ng-model="model[schema.path]" min-date="minDate" show-weeks="true" starting-day="1" class="well well-sm" custom-class="getDayClass(date, mode)"></datepicker>');

        //var input = angular.element('<div class="input-group input-group-md"><span class="input-group-addon" id="sizing-addon1">@</span>'+
        //'<input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon1"> </div>');
        //var input = document.createElement("input");
        //var label = document.createElement("label");
        //label.for = '{{schema.path}}';
        //label.innerHTML= '{{schema.path}}';
        //input.id='ohoho';
        //input.name = '{{schema.path}}';
        //input.type='text';
        //input.setAttribute('ng-model','model[schema.path]');

          //el.append('<input type="text" ng-model="'+scope.model[scope.schema.path]+'"/>');
          //el.append('<input name="'+scope.schema.path+'" type="text" ng-model="'+scope.model[scope.schema.path]+'"/>');
          //el.type('text');
          /*
          if(scope.schema.instance==='String'){
            scope.inputType ='text';
          }else if(scope.schema.instance==='Boolean'){
            scope.inputType ='checkbox';
          }else if(scope.schema.instance==='Date'){
            scope.inputType ='date';
          }

          if(scope.schema.instance==='String'&& scope.schema.path==='content'){
            scope.inputType='textarea';
          }
          */
        //$compile(input)(scope);
        //$compile(label)(scope);
        //element.append(label);
        //element.append(input);
          //console.log(input);
        }
    };
  });
