'use strict';

angular.module('flujorestApp')
  .controller('BlogCtrl', function (Blog) {
    var self = this;
    self.query = Blog.query();

    self.nuevo = new Blog();

    self.salvar = function(){
      self.nuevo.$save();
    };

    self.borrar = function(id){
      Blog.delete(id);
    };

    self.schema = Blog.schema();

    self.formConfig = {
      name:{
        labelText:"Nombresillo",
        requiredText:"Pon el campo oe"
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
      "enumValues":[],
      "regExp":null,
      "path":"name",
      "instance":"String",
      "validators":[
        {
          "message":"Path `{PATH}` is required.",
          "type":"required"
        }
      ],
      "setters":[],
      "getters":[],
      "options":{
        "required":true
      },
      "_index":null,
      "isRequired":true
    };
    self.schemaTitleXXXX = {
      "enumValues":[],
      "regExp":null,
      "path":"title",
      "instance":"String",
      "validators":[
        {
          "message":"Path `{PATH}` is required.",
          "type":"required"
        }
      ],
      "setters":[],
      "getters":[],
      "options":{
        "required":true
      },
      "_index":null,
      "isRequired":true
    };
    self.test='asdfasdf';
  });
