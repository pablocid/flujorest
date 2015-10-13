'use strict';

describe('Service: SchemaToForm.setAttrs ', function () {

  // load the service's module
  beforeEach(module('flujorestApp'));
  var schema = [{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},{'enumValues':[],'regExp':null,'path':'info','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'enumValues':[],'regExp':null,'path':'title','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},{'path':'created','instance':'Date','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},{'path':'updated','instance':'Date','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{'default':'true'},'_index':null,'defaultValue':true},{'schema':{'paths':[{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},{'enumValues':[],'regExp':null,'path':'value','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'enumValues':[],'regExp':null,'path':'descript','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'path':'date','instance':'Date','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{},'_index':null},{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null}],'subpaths':{},'virtuals':{'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'nested':{},'inherits':{},'callQueue':[['pre',{'0':'save'}]],'_indexes':[],'methods':{},'statics':{},'tree':{'name':{'required':true},'_id':{'auto':true},'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'_requiredpaths':['name'],'s':{'hooks':{'_pres':{},'_posts':{}},'queryHooks':{'count':true,'find':true,'findOne':true,'findOneAndUpdate':true,'findOneAndRemove':true,'update':true}},'options':{'id':true,'noVirtualId':false,'_id':true,'noId':false,'validateBeforeSave':true,'read':null,'shardKey':null,'autoIndex':null,'minimize':true,'discriminatorKey':'__t','versionKey':'__v','capped':false,'bufferCommands':true,'strict':true}},'caster':{'_id':'561524b9690b2a8f40fe47e7'},'path':'properties','instance':'Array','validators':[],'setters':[],'getters':[],'options':{'type':[{'paths':{'name':{'enumValues':[],'regExp':null,'path':'name','instance':'String','validators':[{'message':'Path `{PATH}` is required.','type':'required'}],'setters':[],'getters':[],'options':{'required':true},'_index':null,'isRequired':true},'value':{'enumValues':[],'regExp':null,'path':'value','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'descript':{'enumValues':[],'regExp':null,'path':'descript','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'date':{'path':'date','instance':'Date','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'content':{'enumValues':[],'regExp':null,'path':'content','instance':'String','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'active':{'path':'active','instance':'Boolean','validators':[],'setters':[],'getters':[],'options':{},'_index':null},'_id':{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null}},'subpaths':{},'virtuals':{'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'nested':{},'inherits':{},'callQueue':[['pre',{'0':'save'}]],'_indexes':[],'methods':{},'statics':{},'tree':{'name':{'required':true},'_id':{'auto':true},'id':{'path':'id','getters':[null],'setters':[],'options':{}}},'_requiredpaths':['name'],'s':{'hooks':{'_pres':{},'_posts':{}},'queryHooks':{'count':true,'find':true,'findOne':true,'findOneAndUpdate':true,'findOneAndRemove':true,'update':true}},'options':{'id':true,'noVirtualId':false,'_id':true,'noId':false,'validateBeforeSave':true,'read':null,'shardKey':null,'autoIndex':null,'minimize':true,'discriminatorKey':'__t','versionKey':'__v','capped':false,'bufferCommands':true,'strict':true}}]},'_index':null},{'path':'_id','instance':'ObjectID','validators':[],'setters':[null],'getters':[],'options':{'auto':true},'_index':null},{'path':'__v','instance':'Number','validators':[],'setters':[],'getters':[],'options':{},'_index':null}];

  //variables para prueba de config
  var labelText='Texto de la etiqueta';
  var requiredText='Texto requerido';
  var config = {
    name:{
      labelText:labelText,
      order:3,
      requiredText:requiredText
    }
  };
  // instantiate service
  var SchemaToForm, result, func;

  beforeEach(inject(function (_SchemaToForm_) {
    SchemaToForm = _SchemaToForm_;
    func = SchemaToForm.setAttrs(config);
    result = func(schema);
  }));

  describe('', function () {
    it('debe devolver una funcion', function () {
      expect(_.isFunction(func)).toBeTruthy();
    });
    it('debe devolver un array de objetos', function () {
      expect(result).toBeArrayOfObjects();
      expect(_.isArray(result)).toBeTruthy();
    });
    it('debe crearse un atributo ".attrs"', function () {
      result.forEach(function (r) {
        expect(typeof r.attrs).toBe('object');
        if(r.instance==='Array'){
          r.schema.paths.forEach(function (p) {
            expect(typeof p.attrs).toBe('object');
          });
        }
      });
    });
/*    it('el objeto path:"name" debe tener los mismos valores asignados', function () {
      var path = result.filter(function(r){return r.path==='name';})[0].attrs;
      console.log(path);
      expect(path.order).toBe(3);
      expect(path['label-text']).toBe(labelText);
      expect(path['required-text']).toBe(requiredText);
    })*/;
    it('el atributo ".attrs" debe tener debe tener 7 propiedades', function () {
      result.forEach(function (r) {
        expect(Object.keys(r.attrs).length).toBe(7);
        if(r.instance==='Array'){
          r.schema.paths.forEach(function (p) {
            expect(Object.keys(p.attrs).length).toBe(7);
          });
        }
      });
    });
    it(' las propiedades del atributo ".attrs" deben ser igual a [\'schema\',\'model\',\'for\',\'name\',\'label-text\',\'required-text\',\'order\'] ', function () {
      var esperado = ['schema','model','for','name','label-text','required-text','order'];
      result.forEach(function (r) {
        expect(_.isEqual(Object.keys(r.attrs),esperado)).toBeTruthy();
      });
    });

  });

});
