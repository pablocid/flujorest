'use strict';

angular.module('flujorestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mainSchema', {
        url: '/mainschema',
        templateUrl: 'app/mainSchema/mainSchema.html',
        controller: 'MainSchemaCtrl',
        controllerAs:'msCtrl'
      })
      .state('secBuilder',{
        url:'/section-builder',
        templateUrl:'app/mainSchema/section-builder.html',
        controllerAs:'secBuilderCtrl',
        controller: function (mainService) {
          var self = this;
          //self.newReg = new mainService();
          self.newReg =mainService.get({id:'564657481a90a7452db43690'});

          self.newReg.section='section';
          self.query = mainService.query();
          self.save = function () {
            self.newReg.$update();
          };
        }
      })
      .state('sections',{
        url:'/sections',
        templateUrl:'app/mainSchema/sections.html',
        controllerAs:'secCtrl',
        controller: function ($resource,$http) {
          var self = this;
          var MainSchm = $resource(
            '/api/main/:id',
            {id: '@_id'},
            {
              update: {
                method: 'PUT'
              }
            }
          );
          $http.get('/api/main/sections/input-models').success(function (data) {
            self.properties = [];
            self.properties.push({id:'main',label:'Nombre de la sección',required:true,field:'text'});
            data.forEach(function (d) {
              var obj={};
              d.properties.forEach(function (p) {
                if(p.id=='main'){obj.id = p.string;}
                if(p.id=='label'){obj.label = p.string;}
                if(p.id=='required'){obj.required=p.boolean;}
                if(p.id=='type'){obj.field= p.string}
              });
              self.properties.push(obj);
            });
          });

          self.newReg = new MainSchm();
          self.newReg.properties=[];
          self.query = MainSchm.query();
          self.save = function () {
            self.newReg.$save();
          };
          self.props=[
            {label:'Título de la entrada',id:'title',type:'text',field:'content'},
            {label:'Subtítulo',id:'subtitle',type:'text',field:'content'},
            {label:'Contenido de la entrada',id:'content',type:'textarea',field:'content'}
          ];
        }
      })
      .state('inputs',{
        url:'/inputs',
        templateUrl:'app/mainSchema/input.html',
        controllerAs:'inputCtrl',
        controller: function ($resource,$http) {
          var self = this;
          // ids: main, decription, label, required, validation, type

          var MainSchm = $resource(
            '/api/main/:id',
            {id: '@_id'},
            {
              update: {
                method: 'PUT'
              }
            }
          );

          self.newReg = new MainSchm();
          self.newReg.section = 'inputModel';
          self.newReg.properties=[];
          self.newReg.properties[5]={
            id:'optionsList',
            array:[]
          };
          var sd = '';
          self.getset={
            theArray:function(newName) {

              // Note that newName can be undefined for two reasons:
              // 1. Because it is called as a getter and thus called with no arguments
              // 2. Because the property should actually be set to undefined. This happens e.g. if the
              //    input is invalid
              if(arguments.length){

                sd=newName.split(',').map(function(a){return a.trim();});
                self.newReg.properties[5].array=sd.filter(function(f){return f;});
                return sd;
              }else{
                return sd;
              }
              //return arguments.length ? (_name = newName.split(',')) : _name;
            }
          };
          self.query = MainSchm.query();
          self.save = function () {
            self.newReg.$save();
          };
          self.props=[
            {label:'Name',id:'inputName',type:'text',field:'string'},
            {label:'Etiqueta',id:'label',type:'text',field:'string'},
            {label:'Tipo de campo',id:'type',type:'text',field:'string'},
            {label:'Lista de opciones',id:'list',type:'text',field:'array'},
          ];


          self.inputs = {
            section: "input",
            properties: [
              {
                id:'label',
                content: "Título de la entrada",
                _id: "563a3ad14a1d38df58568db3",
                list: [ ]
              },
              {
                id:'required',
                _id: "563a3ad14a1d38df58568db2",
                list: [ ],
                boolean:true
              },
              {
                id:'validation',
                _id: "563a3ad14a1d38df58568db1",
                list: [ ],
                validation:true
              },
              {
                id:'type',
                _id: "563a3ad14a1d38df58568db1",
                content:'text',
                list: [ ]
              }
            ],
            status: true
          };
        }
      })
      .state('section',{
        url:'/section/:section',
        templateUrl:'app/mainSchema/sec.html',
        controller: function ($stateParams,$http, mainService) {
          var self = this;
          self.current = $stateParams.section;
          /*
          mainService.get({id:"564657481a90a7452db43690"}).$promise.then(function (a) {
            self.mainS = a.setPropById('relations','string','user')
          });*/
          $http.get('/api/main/sections/'+self.current).success(function (data) {
            //console.log(data);
            self.items = data;
          });
        },
        controllerAs:'secCtrl'
      })
      .state('sec',{
        url:'/section/:section/:main',
        templateUrl:'app/mainSchema/s.html',
        controller: function ($stateParams,$http) {
          var self = this;
          $http.get('/api/main/sections/section/'+$stateParams.section).success(function (d) {
            console.log(d);
            self.schema = d;
            $http.get('/api/main/sections/'+$stateParams.section+'/'+$stateParams.main).success(function (data) {
              console.log(data);
              self.items = data;
            });
          });
        },
        controllerAs:'sCtrl'
      })
      .state('registration',{
        url:'/registration/:section',
        templateUrl:'app/mainSchema/add.html',
        controllerAs:'addCtrl',
        controller: function (mainService,$stateParams) {
          var self = this;
          self.currentSection = $stateParams.section;
          self.newReg = new mainService();
          self.save = function () {
            self.newReg.$save();
          }
        }
      });
  });
