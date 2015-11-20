'use strict';

angular.module('flujorestApp')
  .factory('mainService', function ($resource) {
    var MainService = $resource(
      '/api/main/:id',
      {id: '@_id'},
      {
        schema:{
          method:'GET',
          params:{id:'schema'}
        },
        update: {
          method: 'PUT'
        }
      }
    );

    MainService.prototype.getPropById = function(id,key){
      if(!this.properties){return;}

      var index = this.properties.map(function(a){return a.id;}).indexOf(id);
      if(index !==-1){
        if(key){
          return this.properties[index][key];
        }else{
          return this.properties[index];
        }

      }else{
        return;
      }
    };
    MainService.prototype.setPropById = function(id,key,content){
      if(!this.properties){this.properties=[];}
      var index = this.properties.map(function(a){return a.id;}).indexOf(id);
      console.log(index);
      if(index !==-1){
        this.properties[index][key]=content;
        //return this.properties[index];
      }else{
        var obj = {};
        obj.id = id;
        obj[key]=content;
        this.properties.push(obj);
        //var length =
        //return this.properties[length-1];
      }
    };
    MainService.prototype.getInputById = function(id,key){
      if(!this.properties){return;}

      var index = this.properties.map(function(a){return a.id;}).indexOf('inputs');
      if(index ===-1){return;}

      var indexInput = this.properties[index].arrayMix.map(function(a){return a.id;}).indexOf(id);
      if(indexInput ===-1){return;}

      if(key){
        return this.properties[index].arrayMix[indexInput][key];
      }else{
        return this.properties[index].arrayMix[indexInput];
      }
    };
    MainService.prototype.setInputById = function(id,key,content){

      if(!this.properties){this.properties=[];}
      var index = this.properties.map(function(a){return a.id;}).indexOf('inputs');
      if(index ===-1){index = this.properties.push({id:'inputs'}) -1;}

      console.log(index);
      if(!this.properties[index].arrayMix){this.properties[index].arrayMix=[];}
      var indexInput = this.properties[index].arrayMix.map(function(a){return a.id;}).indexOf(id);
      if(indexInput ===-1){
        var obj = {};
        obj.id = id;
        obj[key]=content;
        var newIndex = this.properties[index].arrayMix.push(obj) -1;
        return this.properties[index].arrayMix[newIndex];
      }

      this.properties[index].arrayMix[indexInput][key]=content;
      return this.properties[index].arrayMix[indexInput];

    };
    MainService.prototype.deleteInputById = function(id){
      if(!this.properties){return;}
      var index = this.properties.map(function(a){return a.id;}).indexOf('inputs');
      if(index ===-1){return;}
      if(!this.properties[index].arrayMix ||this.properties[index].arrayMix.length===0 ){return;}
      var indexInput = this.properties[index].arrayMix.map(function(a){return a.id;}).indexOf(id);
      if(indexInput ===-1){return;}
      this.properties[index].arrayMix.splice(indexInput,1);
      return true;
    };
    MainService.prototype.existPropById = function (id) {
      console.log(this.section);
      if(!this.properties || this.properties.length===0){return false;}

      var index = this.properties.map(function(a){return a.id;}).indexOf(id);
      if(index===-1){return false;}
      return true;
    };

    return MainService;
  });
