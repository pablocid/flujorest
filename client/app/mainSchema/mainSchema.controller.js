'use strict';

angular.module('flujorestApp')
  .controller('MainSchemaCtrl', function (mainService) {
    var self = this;

    self.schema = mainService.schema();
    console.log(self.schema);
    self.newReg = new mainService();
    self.newReg.properties=[];
    self.query = mainService.query();
    self.save = function () {
      self.newReg.$save();
    };
    self.props=[
      {label:'Nombre de la sección',id:'name',type:'text',field:'content'},
      {label:'Subtítulo',id:'subtitle',type:'text',field:'content'},
      {label:'Contenido de la entrada',id:'content',type:'textarea',field:'content'}
    ];
  });
