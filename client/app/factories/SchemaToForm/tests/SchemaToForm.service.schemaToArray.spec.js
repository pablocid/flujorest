'use strict';

describe('Service: SchemaToForm.schemaToArray', function () {

  // load the service's module
  beforeEach(module('flujorestApp'));
  //schema de prueba
  var schema = {'name':{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path \`{PATH}\` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'info':{'enumValues':[],'regExp':null,'path':'info','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'title':{'enumValues':[],'regExp':null,'path':'title','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'created':{'path':'created','instance':'Date','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'updated':{'path':'updated','instance':'Date','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'content':{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'active':{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{'default':'true'},'_index':null,'defaultValue':true},'properties':{'schema':{'paths':{'name':{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'value':{'enumValues':[],'regExp':null,'path':'value','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'descript':{'enumValues':[],'regExp':null,'path':'descript','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'date':{'path':'date','instance':'Date','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'content':{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'active':{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'_id':{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null}},'subpaths':{},'virtuals':{'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'nested':{},'inherits':{},'callQueue':[['pre',{'0':'save'}]],'_indexes':[],'methods':{},'statics':{},'tree':{'name':{'required':true},'_id':{'auto':true},'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'_requiredpaths':['name'],'s':{'hooks':{'_pres':{},'_posts':{}},'queryHooks':{'count':true,'find':true,'findOne':true,'findOneAndUpdate':true,'findOneAndRemove':true,'update':true}},'options':{'id':true,'noVirtualId':false,'_id':true,'noId':false,'validateBeforeSave':true,'read':null,'shardKey':null,'autoIndex':null,'minimize':true,'discriminatorKey':'__t','versionKey':'__v','capped':false,'bufferCommands':true,'strict':true}},'caster':{'_id':'56142266086ed50b449fbc02'},'path':'properties','instance':'Array','validators':[],'setters':[],'getters':[],'options':{'type':[{'paths':{'name':{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'value':{'enumValues':[],'regExp':null,'path':'value','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'descript':{'enumValues':[],'regExp':null,'path':'descript','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'date':{'path':'date','instance':'Date','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'content':{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'active':{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'_id':{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null}},'subpaths':{},'virtuals':{'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'nested':{},'inherits':{},'callQueue':[['pre',{'0':'save'}]],'_indexes':[],'methods':{},'statics':{},'tree':{'name':{'required':true},'_id':{'auto':true},'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'_requiredpaths':['name'],'s':{'hooks':{'_pres':{},'_posts':{}},'queryHooks':{'count':true,'find':true,'findOne':true,'findOneAndUpdate':true,'findOneAndRemove':true,'update':true}},'options':{'id':true,'noVirtualId':false,'_id':true,'noId':false,'validateBeforeSave':true,'read':null,'shardKey':null,'autoIndex':null,'minimize':true,'discriminatorKey':'__t','versionKey':'__v','capped':false,'bufferCommands':true,'strict':true}}]},'_index':null},'_id':{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null},'__v':{'path':'__v','instance':'Number','validators':[],'setters':[],'getters':[],'options':{},'_index':null}};

  // instantiate service
  var SchemaToForm;

  beforeEach(inject(function (_SchemaToForm_) {
    SchemaToForm = _SchemaToForm_;
  }));

  describe('.schemaToArray: ',function(){
    var result;
    beforeEach(function () {
      result = SchemaToForm.schemaToArray(schema);
    });
    it('Deberia retornar un array', function () {
      expect(result).toBeArray();
    });
    it('Deberia retornar un array de objetos', function () {
      expect(result).toBeArrayOfObjects();
    });
    it('Cada objeto del array deberia tener un atributo "instance"', function () {
      result.forEach(function (a) {
        var inst = Object.keys(a).filter(function (f) {return f==='instance';}).length;
        expect(inst).toBe(1);
      });
    });
    describe('Si existe una instance "Array" la ruta schema.paths: ', function () {
      var arrayInstances;
      beforeEach(function () {
        arrayInstances = result.filter(function (r) {return r.instance==='Array';});
      });
      it('Deberia retornar un array de objetos', function () {
        arrayInstances.map(function (p) {
          expect(p.schema.paths).toBeArrayOfObjects();
        });
      });
      it('Cada objeto del array deberia tener un atributo "instance"', function () {
        arrayInstances.forEach(function (a) {
          var inst = Object.keys(a).filter(function (f) {return f==='instance';}).length;
          expect(inst).toBe(1);
        });
      });
    });
  });

});
