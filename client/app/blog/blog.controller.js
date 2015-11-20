'use strict';

angular.module('flujorestApp')
  .controller('BlogCtrl', function (Blog) {
    var self = this;

    self.query = Blog.query();

    self.edit = function(id){
      self.registro = Blog.get({'id':id});
    };

    self.update = function(){
      //console.log(self.registro);
      self.registro.$update();
      delete self.registro;
      self.query = Blog.query();
    };

    self.makeNew = function () {
      self.nuevo = new Blog();
    };

    self.salvar = function(){
      self.nuevo.$save();
      self.nuevo = false;
      self.query = Blog.query();
    };


    self.borrar = function(id){
      Blog.delete(id);
    };

    self.schema = Blog.schema();

    self.formConfig = {
      formTextContent:{
        mainTitle:'Crea una sección',
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
        titleBlock:'Número de la propiedad',
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
        }
      }
    };

    Blog.schema(function(a){
      self.schemaTitle = a.title;
      //console.log(self.schemaName);
    });

    self.inputTextConfig={
      labelText:'Titulo input',
      requiredText:'Este campo debe ser llenado madafaca'
    };

    self.schemaName = {
      'enumValues':[],
      'regExp':null,
      'path':'name',
      'instance':'String',
      'validators':[
        {
          'message':'Path `{PATH}` is required.',
          'type':'required'
        }
      ],
      'setters':[],
      'getters':[],
      'options':{
        'required':true
      },
      '_index':null,
      'isRequired':true
    };
    self.schemaTitleXXXX = {
      'enumValues':[],
      'regExp':null,
      'path':'title',
      'instance':'String',
      'validators':[
        {
          'message':'Path `{PATH}` is required.',
          'type':'required'
        }
      ],
      'setters':[],
      'getters':[],
      'options':{
        'required':true
      },
      '_index':null,
      'isRequired':true
    };
    self.test='asdfasdf';


    function setInputText(inputElement){
      var input = angular.element('<input-text-schm />').attr(inputElement.attrs);
      return input;
    }

    function setInputDate(inputElement){
      var input = angular.element('<input-date-schm />').attr(inputElement.attrs);
      return input;
    }

    function setInputTextArea (inputElement){
      //console.log('inputElement');
      //console.log(inputElement);
      var div = angular.element('<div />');
      div.html('<label>'+inputElement.attrs['label-text']+'</label>');
      var d = angular.element('<text-angular />').attr({
        'ng-model':inputElement.attrs.model,
        'name': inputElement.attrs.name
      });
      div.append(d);
      return div;
    }

    self.htmlFuncs =[
      {
        parentPath:false,
        path:'content',
        instance:'String',
        func:setInputTextArea
      },
      {
        parentPath:false,
        path:false,
        instance:'String',
        func:setInputText
      },
      {
        parentPath:false,
        path:false,
        instance:'Date',
        func:setInputDate
      }
    ];


/*
*
* attrs={
 "schema"
 "model"
 "for"
 "name"
 "label-text"
 "required-text"
 "order"
 };
* */








  });
