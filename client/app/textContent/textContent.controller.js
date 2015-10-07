'use strict';
/**
 * @ngdoc controller
 * @name flujorestApp.controller: TextContentCtrl
 * @description Es donde esta toda la logica ilogica
 */
angular.module('flujorestApp')
  .controller('TextContentCtrl', function ($scope, TextContent, $sce) {
    /// iframe
    $scope.showIt = '<iframe src="//docs.google.com/document/d/1g5m9e9fBv_xbGfmFR6bUM2UbQGZn2iY-FVzJirWYTyw/pub?embedded=true"></iframe>';
    $scope.htmlSafe = function (data) {
        return $sce.trustAsHtml(data);
      };

    ////
    $scope.query = TextContent.query();

    $scope.edit = function(id){
      $scope.registro = TextContent.get({'id':id});
    };

    $scope.update = function(){
      $scope.registro.$update();
      delete $scope.registro;
      $scope.query = TextContent.query();
    };

    $scope.schema = TextContent.schema();

    $scope.formConfig = {
      formTextContent:{
        mainTitle:'Entrada de Blog',
        submitBtn:'Enviar el formulario'
      },
      name:{
        labelText:'Nombresillo',
        requiredText:'Pon el campo oe',
        order:1
      },
      info:{
        labelText:'Información',
        requiredText:'Debes llenar esta info',
        order:2
      },
      content:{
        labelText:'Contenido',
        requiredText:'Debes llenar este campo',
        order:4
      },
      title:{
        labelText:'Titulo de la cosa',
        requiredText:'Debes llenar este campo',
        order:3
      },
      properties:{
        order:5,
        titleArray:'Propiedades del documento',
        addItemToArray:'Agrega una nueva propiedad',
        deleteArrayItemBtn:'Borra esta propiedad',
        name:{
          labelText:'Nombre dentro de una propiedad',
          requiredText:'No seay choclo',
          order:1
        },
        value:{
          labelText:'El Valor',
          requiredText:'No seay choclo',
          order:2
        },
        descript:{
          labelText:'La descripcion',
          requiredText:'No seay choclo',
          order:3
        },
        content:{
          labelText:'Contenido dentro de la propiedad',
          requiredText:'Debes llenar este campo',
          order:4
        }
      }
    };
    function setInputText(inputElement){
      var input = angular.element('<input-text-schm />').attr(inputElement.attrs);
      return input;
    }

    function setInputBoolean(inputElement){
      var input = angular.element('<input-date-schm />').attr(inputElement.attrs);
      return input;
    }

    function setInputTextArea (inputElement){
      //console.log(inputElement.attrs);
      var div = angular.element('<div />');
      div.html('<label>'+inputElement.attrs['label-text']+'</label>');
      var d = angular.element('<text-angular />');
      d.attr('ng-model',inputElement.attrs.model);
      div.append(d);
      return div;
    }

    $scope.htmlFuncs =[
      {
        path:'en',
        instance:'String',
        func:setInputTextArea
      },
      {
        path:'es',
        instance:'String',
        func:setInputTextArea
      },
      {
        path:false,
        instance:'String',
        func:setInputText
      },
      {
        path:false,
        instance:'Date',
        func:setInputBoolean
      }
    ];

  });
