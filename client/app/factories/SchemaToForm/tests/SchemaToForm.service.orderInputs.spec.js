'use strict';

describe('Service: SchemaToForm.orderInputs', function () {
  beforeEach(module('flujorestApp'));

  //var schema = [{path:'nombre',attrs:{order:1}},{path:'apellido',attrs:{order:2}},{path:'info',attrs:{order:3}},{path:'content',attrs:{order:''}}];
  //var orden = ['nombre','apellido','info','content'];
  var config = {
    nombre:{
      order:''
    }
  };

  //intanciar el servicio
  var orderInputs;
  beforeEach(inject(function (_SchemaToForm_) {
    orderInputs = _SchemaToForm_.orderInputs(config);
  }));

  it(' debería retornar un array', function () {
    expect(typeof orderInputs).toBe('function');
  });
});
