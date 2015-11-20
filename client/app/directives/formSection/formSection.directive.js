'use strict';

angular.module('flujorestApp')
  .directive('formSection', function ($compile) {
    return {
      templateUrl: 'app/directives/formSection/formSection.html',
      restrict: 'EA',
      scope:{
        newReg:'='
      },
      link: {
        pre: function (scope, element, attrs) {
/*          var inputMain = element.find('#main').attr({
            'ng-model':'newReg.properties[0].string'
          });
          var inputDescription = element.find('#description').attr({
            'ng-model':'newReg.properties[1].string'
          });
          var inputRelations = element.find('#relations').attr({
            'ng-model':'newReg.properties[2].string'
          });
          var inputInputs = element.find('#inputs').attr({
            'ng-model':'getset.theArray',
            'ng-model-options':"{ getterSetter: true }"
          });*/

          //var form = element.find('form');
          //$compile(form)(scope);
        },
        post:function (scope, element, attrs) {
          scope.getset= {
            flat: function (id, key) {
              return function (newVal) {
                if (arguments.length) {
                  newVal = normalize(newVal);
                  scope.newReg.setPropById(id, key, newVal);
                  return scope.newReg.getPropById(id, key);
                } else {
                  return scope.newReg.getPropById(id, key);
                }
              }
            },
            text: function (id,key) {
              return function (newVal) {
                if(arguments.length){scope.newReg.setPropById(id,key,newVal);}
                return scope.newReg.getPropById(id,key);
              }
            },
            flatInputs: function (id, key) {
              return function (newVal) {
                if (arguments.length) {
                  newVal = normalize(newVal);
                  scope.newReg.setInputById(id, key, newVal);
                  return scope.newReg.getInputById(id, key);
                } else {
                  return scope.newReg.getInputById(id, key);
                }
              }
            },
            textInputs: function (id, key) {
              return function (newVal) {
                if (arguments.length) {
                  scope.newReg.setInputById(id, key, newVal);
                  return scope.newReg.getInputById(id, key);
                } else {
                  return scope.newReg.getInputById(id, key);
                }
              }
            },
            optionListInputs: function (id, key) {
              return function(newName) {
                if(arguments.length){
                  scope.newReg.setInputById(id, key, newName.split(',').map(function(a){return a.trim();}));
                  return scope.newReg.getInputById(id, key);
                }else{
                  return scope.newReg.getInputById(id, key);
                }
              }
            },
          };
          if(scope.newReg.$promise){
            scope.newReg.$promise.then(setForm);
          }else{
            setForm();
          }



          function setForm(data) {
            //funcion que impide que se muestren caracteres especiales ni espacios en blanco
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
            var normalize = (function() {
              var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
                to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
                mapping = {};

              for(var i = 0, j = from.length; i < j; i++ )
                mapping[ from.charAt( i ) ] = to.charAt( i );

              return function( str ) {
                if(!str){return;}
                var ret = [];
                for( var i = 0, j = str.length; i < j; i++ ) {
                  var c = str.charAt( i );
                  if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                  else
                    ret.push( c );
                }
                return ret.join( '' ).replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase();
              }

            })();

            // Elementos a utilizar
            var form = element.find('form').clone().removeAttr('id').empty();
            var main = element.find('#main').clone().removeAttr('id');
            var description = element.find('#description').clone().removeAttr('id');

            //Sección inputs
            var inputs = element.find('#inputs').clone().empty().removeAttr('id');
            var inputsBlock = angular.element('<div/>').addClass('form-inline');
            //inputs individuales
            var inputMainSelect = element.find('#inputMainSelect').clone().removeAttr('id');
            var inputMain = element.find('#inputMain').clone().removeAttr('id');
            var inputName = element.find('#inputName').clone().removeAttr('id');
            var inputDesc = element.find('#inputDesc').clone().removeAttr('id');
            var inputLabel = element.find('#inputLabel').clone().removeAttr('id');
            var inputRequired = element.find('#inputRequired').clone().removeAttr('id');
            var inputOptionList = element.find('#inputOptionList').clone().removeAttr('id');
            var addInputBtn = element.find('#addInputBtn').clone().removeAttr('id');
            var submitBtn = element.find('#submitBtn').clone().removeAttr('id');

            // elementos del select
            var selectValues = [
              //{value:'main',label:'Main ID (unico)'},
              {value:'text', label:'Campo de texto normal'},
              {value:'number', label:'Campo de número'},
              {value:'boolean', label:'Verdadero/Falso'},
              {value:'optionList', label:'Lista de opciones'},
              {value:'textEditor', label:'Editor de texto'},
              {value:'password', label:'Contraseña/Password'},
              {value:'email', label:'Campo para E-Mail'},
              {value:'code', label:'Campo de código'},
              {value:'csv', label:'Lista de valores'},
              {value:'date', label:'Fecha'},
              {value:'relation', label:'Relación con otra sección'}
            ];

            selectValues.forEach(function (sel) {
              inputMainSelect.find('select').append(angular.element('<option value="'+sel.value+'">'+sel.label+'</option>'));
            });

            //limpiar element
            element.empty();

            /*
             function grabElement(ele){
             return function (id) {
             var elementGrabed = ele.find(id).clone();
             elementGrabed.removeAttr('id');
             //console.log(elementGrabed)
             return elementGrabed;
             }
             }
             function setInputAttr (attrsObj){
             return function (ele) {
             ele.find('input').attr(attrsObj);
             return ele;
             };
             }
             function appendToForm(ele){
             var theform=element.find('form').empty();
             theform.append(ele);
             //console.log(theform);
             return theform;
             }
             function emptyForm(ele){
             element.find('form').empty();
             return ele;
             }
             function formCompile(form){
             $compile(form)(scope);
             }
             function returnArgms(){
             var args = Array.prototype.slice.call(arguments);
             return args.sort();
             }
             function appendArrayToForm(elmt){
             return function (eles) {
             //console.log(eles);
             elmt.find('form').empty();
             var theform=elmt.find('form');
             eles.forEach(function (ele) {
             theform.append(ele);
             });

             //console.log(theform);
             return theform;
             }
             }
             function inputSelectByType(inputsEle){
             return function (type) {
             var inputBuild = inputsEle.clone().empty();
             var select = inputsEle.find('#inputMainSelect').removeAttr('id');
             var selectAnsw = inputsEle.find('#inputsSelected').clone();

             var selectValues = [
             {value:'main',label:'ID o url (unico)'},
             {value:'text', label:'Campo de texto normal'},
             {value:'number', label:'Campo de número'},
             {value:'boolean', label:'Verdadero/Falso'},
             {value:'optionList', label:'Lista de opciones'},
             {value:'textEditor', label:'Editor de texto'},
             {value:'password', label:'Contraseña/Password'},
             {value:'email', label:'Campo para E-Mail'},
             {value:'code', label:'Campo de código'},
             {value:'csv', label:'Valores separados por coma'},
             {value:'date', label:'Fecha'},
             {value:'relation', label:'Relación con otra sección'}
             ];
             selectValues.forEach(function (sel) {
             select.find('select').append(angular.element('<option value="'+sel.value+'">'+sel.label+'</option>'));
             });

             inputBuild.append(select);
             inputBuild.append(selectAnsw);

             select.find('select').on('change',function (a) {
             selectAnsw.empty();
             var valor = select.find('select').val();
             if(valor==='main'){
             var main = inputsEle.find('#inputMain').clone().removeAttr('id');
             main.find('input').attr({'disabled':'disabled'}).text('main');
             selectAnsw.append(main);
             }
             });

             return inputBuild;
             }
             }
             */

            //basic setting form
            main.find('input').attr({
              'ng-model':'getset.flat("main","string")',
              'ng-model-options':'{ getterSetter: true }',
              'required':true
            });
            description.find('input').attr({
              'ng-model':'getset.text("description","string")',
              'ng-model-options':'{ getterSetter: true }'
            });
            form.append(main);
            form.append(description);

            //inputs section
            form.append(inputs);
            inputs.append(addInputBtn);
            addInputBtn.find('button').attr({'ng-class':'{disabled:myForm.$invalid}'}).on('click', function () {
              insertBlock();
              $compile(form)(scope);
            });

            //submit btn
            submitBtn.find('button').attr({'ng-class':'{disabled:myForm.$invalid}'}).on('click', function () {
              console.log('Click');
              if(scope.newReg._id){
                scope.newReg.$update();
              }else{
                scope.newReg.$save();
              }
            });

            form.append(submitBtn);
            /*          (function(){
             var block = inputsBlock.clone();
             var iM = inputMain.clone();
             var iMS = inputMainSelect.clone();
             var iN = inputName.clone();

             iMS.find('select').attr('disabled','disabled');
             iN.find('input').attr({
             'ng-model':'getset.flatInputs("main","name")',
             'ng-model-options':'{getterSetter:true}',
             'ng-required':true,
             'name':'input'+Math.floor(Math.random()*1000000),
             'placeholder':'principal de un registro'
             });
             iM.find('input').val('main').attr('disabled','disabled');
             block.append([iMS,iM,iN]);
             addInputBtn.before(block);
             })();*/
            //scope.newReg.properties && scope.newReg.properties.length>0 && scope.newReg.properties.filter(function(a){return a.id==='inputs'}).length >0
            //scope.newReg.existPropById('inputs')
            console.log(scope.newReg.properties);

            if(scope.newReg.existPropById('inputs')){
              console.log('existes inputs');
              scope.newReg.getPropById('inputs').arrayMix.forEach(function (c) {
                insertBlock(c.id, c.type);
              });
            }else{
              console.log('no existen inputs');
              insertBlock ('main','text');
            }

            var idMaker = function () {
              return ""+Math.floor(Math.random()*10000)+"";
            };

            function insertBlock (id,type){
              var idInput = id || idMaker();
              var block = inputsBlock.clone();
              var iM = inputMain.clone();
              var iMS = inputMainSelect.clone();
              var iN = inputName.clone();

              var iD=inputDesc.clone();
              var iL=inputLabel.clone();
              var iR=inputRequired.clone();
              var iOL=inputOptionList.clone();

              /*              if(id==='main'){
               scope.newReg.setInputById('main', 'type', 'text');
               iMS.find('select').attr('disabled','disabled');
               iN.find('input').attr({
               'ng-model':'getset.flatInputs("main","name")',
               'ng-model-options':'{getterSetter:true}',
               'ng-required':true,
               'name':'input'+Math.floor(Math.random()*1000000),
               'placeholder':'principal de un registro'
               });
               iM.find('input').val('main').attr('disabled','disabled');
               iM.find('input').val('main').attr('disabled','disabled');
               block.append([iMS,iN,iL]);
               addInputBtn.before(block);
               return true;
               }*/

              var contain = angular.element('<div />').addClass('form-group');
              var eraseBtn = angular.element('<button class="btn btn-primary">Borrar</button>');
              eraseBtn.on('click', function () {
                block.remove();
                scope.newReg.deleteInputById(idInput);
                $compile(form)(scope);
              });
              addInputBtn.before(block);
              block.append([iMS,contain,eraseBtn]);

              iMS.find('select').on('change', function () {
                var value = iMS.find('select').val();
                scope.newReg.setInputById(idInput, 'type', value);
                iMS.find('select').attr('disabled','disabled');
                contain.empty();

                //basic settings
                iN.find('input').attr({
                  'ng-model':'getset.flatInputs("'+idInput+'","name")',
                  'ng-model-options':'{getterSetter:true}',
                  'ng-required':true,
                  'name':'name'+Math.floor(Math.random()*1000000),
                  'placeholder':'principal de un registro'
                });
                iD.find('input').attr({
                  'ng-model':'getset.textInputs("'+idInput+'","description")',
                  'ng-model-options':'{getterSetter:true}',
                  'name':'description'+Math.floor(Math.random()*1000000),
                  'placeholder':'descripción el campo'
                });
                iL.find('input').attr({
                  'ng-model':'getset.textInputs("'+idInput+'","label")',
                  'ng-model-options':'{getterSetter:true}',
                  'name':'label'+Math.floor(Math.random()*1000000),
                  'placeholder':'Etiqueta del campo el campo'
                });
                iR.find('input').attr({
                  'ng-model':'getset.textInputs("'+idInput+'","required")',
                  'ng-model-options':'{getterSetter:true}',
                  'name':'checkbox'+Math.floor(Math.random()*1000000)
                });
                iOL.find('input').attr({
                  'ng-model':'getset.optionListInputs("'+idInput+'","optionList")',
                  'ng-model-options':'{getterSetter:true}',
                  'name':'optionlist'+Math.floor(Math.random()*1000000),
                  'placeholder':'valores separados por coma'
                });
                contain.append([iN,iD,iL,iR]);

                switch (value){
                  case 'optionList':
                    contain.append(iOL);
                    break;
                  case 'text':
                    if(idInput ==='main'){
                      iMS.find('select').attr('disabled','disabled');
                      scope.getset.textInputs('main','required')(true);
                      iR.find('input').attr({'disabled':'disabled'});//,'disabled':'disabled', checked:'checked'
                      eraseBtn.attr('disabled','disabled');
                    }
                    break;
                }

                $compile(form)(scope);
              });
              if(type){
                iMS.find('select').val(type);
                iMS.find('select').trigger('change');
              }
            }

            element.append(form);
            $compile(form)(scope);

          }

          /*function set(data){
            var sd = '';
            var op = {};
            scope.getset={
              flat: function (id,key) {
                return function (newVal) {
                  if(arguments.length){
                    newVal = normalize(newVal);
                    data.setPropById(id,key,newVal);
                    return data.getPropById(id,key);
                  }else{
                    return data.getPropById(id,key);
                  }
                }
              },
              text: function (id,key) {
                return function (newVal) {
                  if(arguments.length){data.setPropById(id,key,newVal);}
                  return data.getPropById(id,key);
                }
              },
              theArray:function(newName) {
                // Note that newName can be undefined for two reasons:
                // 1. Because it is called as a getter and thus called with no arguments
                // 2. Because the property should actually be set to undefined. This happens e.g. if the
                //    input is invalid
                if(arguments.length){
                  sd=newName.split(',').map(function(a){return a.trim();});
                  //attrs.newReg+'.properties[3].array'
                  scope.newReg.properties[3].string=sd.filter(function(f){return f;});
                  return sd;
                }else{
                  return sd;
                }
                //return arguments.length ? (_name = newName.split(',')) : _name;
              },
              optionList: function (index) {
                return function(newName) {
                  if(arguments.length){

                    op[index]=newName.split(',').map(function(a){return a.trim();});

                    scope.newReg.properties[3].arrayMix[index].optionList=op[index].filter(function(f){return f;});
                    return op[index];
                  }else{
                    return op[index];
                  }
                }
              },
              textInput: function (id,key) {
                return function (newVal) {
                  if(arguments.length){data.setInputById(id,key,newVal);}
                  return data.getInputById(id,key);
                }
              }
            };

            /!*main.find('input').attr({
              'ng-model':'getset.flat("main","string")',
              'ng-model-options':'{ getterSetter: true }'
            });
            form.append(main);*!/

            desc.find('input').attr({
              'ng-model':'getset.text("description","string")',
              'ng-model-options':'{ getterSetter: true }'
            });
            form.append(desc);

            function setinputadd(){
              var settingInput= inputs.clone();
              settingInput.find('#inputMain').hide();
              settingInput.find('#inputName').hide();
              settingInput.find('#inputLabel').hide();
              settingInput.find('#inputDesc').hide();
              settingInput.find('#inputRequired').hide();
              settingInput.find('#inputOptionList').hide();
              settingInput.find('#addInputBtn').hide();
              settingInput.find('#addInputBtn').on('click', function () {
                setinputadd();
              });


              var selectValues = [
                {value:'main',label:'ID o url (unico)'},
                {value:'text', label:'Campo de texto normal'},
                {value:'number', label:'Campo de número'},
                {value:'boolean', label:'Verdadero/Falso'},
                {value:'optionList', label:'Lista de opciones'},
                {value:'textEditor', label:'Editor de texto'},
                {value:'password', label:'Contraseña/Password'},
                {value:'email', label:'Campo para E-Mail'},
                {value:'code', label:'Campo de código'},
                {value:'csv', label:'Valores separados por coma'},
                {value:'date', label:'Fecha'},
                {value:'relation', label:'Relación con otra sección'}
              ];

              selectValues.forEach(function (sel) {
                settingInput.find('select').append(angular.element('<option value="'+sel.value+'">'+sel.label+'</option>'));
              });

              settingInput.find('select').on('change',function (a) {
                console.log("cambio");
                settingInput.find('#addInputBtn').show();
                var value = settingInput.find('select').val();
                if(value==='main'){
                  settingInput.find('#inputMain').hide();

                  settingInput.find('#inputLabel').show();
                  settingInput.find('#inputLabel').find('input').attr({
                    'ng-model':'getset.textInput("main","label")',
                    'ng-model-options':'{getterSetter:true}'
                  });

                  settingInput.find('#inputDesc').show();
                  settingInput.find('#inputDesc').find('input').attr({
                    'ng-model':'getset.textInput("main","description")',
                    'ng-model-options':'{getterSetter:true}'
                  });

                  settingInput.find('#inputName').show();
                  settingInput.find('#inputName').find('input').attr({
                    'ng-model':'getset.textInput("main","name")',
                    'ng-model-options':'{getterSetter:true}'
                  });
                  settingInput.find('#inputMain').show().find('input').val('main')//.attr('disabled',true);
                  settingInput.find('#inputRequired').find('input').attr('checked', true);
                  settingInput.find('#inputOptionList').hide();
                }
                if(value==='text'){
                  settingInput.find('#inputMain').show();
                  settingInput.find('#inputMain').find('input').val();
                  settingInput.find('#inputName').hide();
                  settingInput.find('#inputRequired').find('input').attr('checked', false);
                  settingInput.find('#inputOptionList').hide();
                }
                if(!value){
                  settingInput.find('#inputMain').hide();
                  settingInput.find('#inputName').hide();
                  settingInput.find('#inputLabel').hide();
                  settingInput.find('#inputDesc').hide();
                  settingInput.find('#inputRequired').hide();
                  settingInput.find('#inputOptionList').hide();
                  settingInput.find('#addInputBtn').hide();
                }
                $compile(settingInput)(scope);
              });

              /!*inputs.find('input').attr({
               'ng-model':'getset.text("inputs","arrayMix")',
               'ng-model-options':'{ getterSetter: true }'
               });

               *!/
              form.append(settingInput);



              $compile(form)(scope);

              scope.save = function () {
                if(data._id){
                  data.$update();
                }else{
                  data.$save();
                }
              }
            }


            setinputadd();

          }*/

          //var input = {id:'input'+Math.floor(Math.random()*10000), main:'',description:'',label:'',type:'',optionList:[], required:false};
          //scope.addInput = function () {
          //  scope.newReg.properties[2].arrayMix.push({id:'input'+Math.floor(Math.random()*100000), main:'',description:'',label:'',type:'',optionList:[], required:false});
          //};

          //set(scope.newReg);
        }
      }
    };
  });
