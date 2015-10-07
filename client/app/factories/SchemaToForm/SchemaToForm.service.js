'use strict';
/**
 * @ngdoc service
 * @name flujorestApp.factory:SchemaToForm
 * @element
 * @scope
 * @restrict EA
 * @description
 *  Funciones necesarias para transformar un schema desde mongodb a un formulario en HTML.
 *
 */
angular.module('flujorestApp')
  .factory('SchemaToForm', function () {
    return {
      /**
       * @ngdoc method
       * @name schemaToArray
       * @methodOf flujorestApp.factory:SchemaToForm
       * @description
       * Transforma todos los key de primer nivel y el objeto que tiene la propiedad "instance":"Array" en la ruta schema.paths -- enun array.
       * Ademas, se eliminan todos los metodos que no tienen la propiedad "instance".
       *
       * **Funciones utilizadas en este metodo**
       * - Object.key();
       * - .map();
       * - JSON.stringify();
       * - JSON.parse();
       * - .filter();
       *
       * Para limpiar el objeto y dejarlo en JSON:
       <pre>
       var cleanSchema = JSON.parse(JSON.stringify(schema));
       </pre>
       * @param {object} Schema este parametro proviene del objeto Schema creado por mongoose
       * @returns {Array} Array of objects
       */
      schemaToArray:function (schmx){
        var string = JSON.stringify(schmx);
        var schm = JSON.parse(string);
        return Object
          .keys(schm)
          .map(function (key) {
            if(!schm[key].hasOwnProperty('instance')){return false;}
            if(schm[key].instance==='Array'){
              schm[key].schema.paths = Object.keys(schm[key].schema.paths).map(function (k) { return schm[key].schema.paths[k];});
            }
            return schm[key];
          })
          .filter(function (c) {return c;});
      },
      /**
       * @ngdoc method
       * @name setAttrs
       * @methodOf flujorestApp.factory:SchemaToForm
       * @description
       * Esta función agrega la propiedad attrs a todos los objetos dentro del array. En el caso de los objetos
       * con instance = "Array" realiza el mismo procedimiento pero en la ruta schema>paths
       *
       * **Funciones utilizadas en este metodo**
       * - .map();
       * @param {Array} Schema es el schema de mongodb pasado a un array por la funcion {@link flujorestApp.directive:SchemaToForm#methods_schemaToArray **schemaToArray**}
       * @returns {Array} Array of objects
       */
      setAttrs: function (schm){
      return schm.map(function (s) {
        //console.log(s.instance);
        if(s.instance!=='Array'){
          //console.log('is Not Array');
          s.attrs={
            'schema':'schema.'+s.path,//schema path
            'model':'model.'+s.path,//model path
            'for':'formrandom',
            'name':s.path+Math.floor(Math.random()*1000000),
            'label-text':'{{config.'+ s.path+'.labelText || \''+s.path+'\'}}',
            'required-text':'{{config.'+ s.path+'.requiredText || \''+s.path+'\'}}',
            'order':'{{config.'+ s.path+'.order || 0 }}'
          };
        }
        if(s.instance==='Array'){
          s.schema.paths = s.schema.paths.map(function (p) {
            if(p.instance!=='Array'){
              p.attrs={
                'schema':'schema.'+ s.path+'.schema.paths.'+p.path,//schema path
                'model':'model.'+ s.path+'[k].'+p.path,//model path
                'for':'formrandom',
                'name':s.path+p.path+Math.floor(Math.random()*1000000)+'itemnumber{{k}}',
                'label-text':'{{config.'+ s.path+'.'+ p.path+'.labelText || \''+p.path+'\'}}',
                'required-text':'{{config.'+ s.path+'.'+ p.path+'.requiredText || \''+p.path+'\'}}',
                'order':'{{config.'+ s.path+'.'+ p.path+'.order || 0 }}'
              };
            }
            return p;
          });
        }
        return s;
      });
    },
      /**
       * @ngdoc method
       * @name orderInputs
       * @methodOf flujorestApp.factory:SchemaToForm
       * @description
       * Esta funcion ordena todos los objetos dentro de un array, utilizando la propiedad "order"
       *
       * **Funciones utilizadas dentro de este metodo**
       * - .forEach();
       * - _.sortBy();
       * @param {Array} Schema Array of objects
       * @returns {Array} Array of objects
       */
      orderInputs: function (config) {
        return function (schm) {
          schm.forEach(function (a,i) {
            if(a.instance==='Array'){
              schm[i].schema.paths = _.sortBy(a.schema.paths, function (d) {
                if(config[a.path] && config[a.path][d.path] && config[a.path][d.path].order){
                  return config[a.path][d.path].order;
                }else{
                  return 100;
                }

              });
            }
          });
          return _.sortBy(schm, function (a) {
            return config[a.path]!==undefined ? config[a.path].order : 100;
          });
        };
      },

      //Funcion que recibe funciones para pasar una determinada instancia del schema a html
      //3.- input secundario: schm array. output: schm array con html method
      setInput: function (ArrayFunc, element){
        return function (schm) {
          //console.log('Entrada setInput');
          //console.log(schm);
          return schm
            .map(function (sc) {
              if(sc.instance!=='Array'){
                var indexPath=ArrayFunc.map(function (fn) {return fn.path;}).indexOf(sc.path);


                var index=ArrayFunc.map(function (fn) {
                  if(fn.path){
                    return '';
                  }
                  return fn.instance;
                }).indexOf(sc.instance);
                //si no existe la funcion
                //console.log(indexPath);
                if(indexPath!==-1){
                  sc.html = ArrayFunc[indexPath].func(sc);
                  return sc;
                }else if(index!==-1){
                  //console.log('index');
                  sc.html = ArrayFunc[index].func(sc);
                }
                return sc;
              }

              if(sc.instance==='Array'){
                var div = element.find('#array').clone();
                div.find('#titlearray').text('{{ config.'+sc.path+'.titleArray ||\''+sc.path+'\'}}');

                var arrayInput = div.find('#arrayblock')
                  .attr({'ng-repeat':'(k,v) in model.'+sc.path});
                var btn = element.find('#addproperty').clone().attr({
                  'ng-click':'model.'+sc.path+' ? true : model.'+sc.path+'=[]; model.'+sc.path+'.push({});'
                }).text('{{config.'+sc.path+'.addItemToArray || "Add item"}}');

                sc.schema.paths = sc.schema.paths.map(function (pth) {
                  var indxPath=ArrayFunc.map(function (fn) {return fn.path;}).indexOf(pth.path);
                  var indx=ArrayFunc.map(function (fn) {
                    if(fn.path){
                      return '';
                    }
                    return fn.instance;
                  }).indexOf(pth.instance);
                  //si no existe la funcion
                  if(indxPath !==-1){
                    pth.html = ArrayFunc[indxPath].func(pth);
                  }else if(indx!==-1){
                    pth.html = ArrayFunc[indx].func(pth);
                  }
                  return pth;
                });
                arrayInput.find('#inputblock').html('');
                sc.schema.paths.forEach(function (p) {arrayInput.find('#inputblock').append(p.html);});
                arrayInput.find('#deleteblock').text('{{ config.'+sc.path+'.deleteArrayItemBtn || "Eliminar este item"}}').attr({
                  'ng-click':'model.'+sc.path+'.splice(k,1)'
                });
                div.append([
                  arrayInput,
                  btn,
                  angular.element('<hr />')
                ]);

                sc.html = div;
                return sc;
              }
              return '';
            })
            .filter(function (sc) {return sc;});
        };
      },
      schmToForm: function (element) {
        return function(schm){
          //console.log('Entrada schmToForm');
          //console.log(schm);
          var formulario =element.find('form');

          formulario.find('#formTitle').html('{{ config.formTextContent.mainTitle ||"Nuevo titulo"}}');
          // borrando contenido de #inputGroup
          formulario.find('#inputGroup').html('');

          formulario
            .attr({
              'novalidate':true,
              'ng-submit':'submit()',
              'name':'formrandom'
            });
          formulario.find('#submit')
            .attr({
              'type':'submit',
              'name':'submiting',
              'value':'submit',
            }).text('Enviar');

          schm.forEach(function (s) {
            if(s.html){
              formulario.find('#inputGroup').append(s.html);
            }

          });

          return formulario;
        };
      },
      compileToScope: function ($compile,element, scope) {
        return function (html){
          //elimina html del template
          element.html('');
          $compile(html)(scope);
          element.append(html);
        };
      }
    };
  });
