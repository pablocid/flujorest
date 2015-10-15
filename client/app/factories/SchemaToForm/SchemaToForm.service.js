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
 *  **Proceso**
 *  - Pasar el objeto Schema a array: `schemaToArray`
 *  - Agregar a cada uno de los paths la propiedad `attrs`
 *  - Agregar la propiedad `html` a los paths con el contenido html del input basado en la propiedad instance y el valor de path
 *  - Agregar las propiedades `html` al elemento `form` en orden asignado por la propiedad `attrs.order`
 *  - Compilar el contentido con $compile()(scope);
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
       * Ademas, se eliminan todos los objetos que no tienen la propiedad "instance".
       *
       * **Proceso**
       * - Limpiar el objeto Schema (con `cleanSchema` - más abajo)
       * - Pasar los valores del objeto a un array (`_.values()`)
       * - Filtrar a todos los objetos que no tengan la propiedad `instance`
       * - Pasar valores del objeto a un array de la propiedad `schema.paths` presente en los objetos con propiedad `instance: 'Array'`
       *
       * **Función**
       *  <pre>
       *      function({Schema}){
       *        return [Schema];
       *      }
       *  </pre>
       *
       * **Funciones utilizadas en este metodo**
       * - _.values; // parte de la librería lodash
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

        return _.values(schm)
          .filter(function(a){return a.hasOwnProperty('instance');})
          .map(function (m) {
            if(m.instance==='Array') {
              m.schema.paths = _.values(m.schema.paths);
            }
            return m;
          });
      },

      /**
       * @ngdoc method
       * @name setAttrs
       * @methodOf flujorestApp.factory:SchemaToForm
       * @description
       * Esta función agrega la propiedad `attrs` a todos los objetos dentro del array. En el caso de los objetos
       * con `instance:'Array'` realiza el mismo procedimiento pero en la ruta `schema.paths`.
       * ## El contenido de la propiedad son:
       * - schema: 'String'; path de mongodb
       * - model: 'String'; es la variable  *scope.model* con la ruta específica que
       * corresponde al nombre del path
       * - for: 'String'; el *name* del formulario
       * - name: 'String'; el nombre del input
       * - label-text: 'String'; la etiqueta del input
       * - required-text:'String'; el texto que se despliega cuando el input es requerido
       *
       *
       * **Nota:** En el caso de la propiedad name de los schema.paths dentro del array, su valor
       * 'Strings' deben ser compiladas ($compile) para que sea evaluada la variable k utilizada en el ng-repeat.
       *
       * **Depende de:**
       * - la variable de configuración se llame `config` y de su estructura
       * - la variable del modelo se llame `model`
       * - el formulario se llame `formrandom`
       *
       *
       * ** Estructura del objeto `config[path]`**: Este se debe definir dentro del controlador que utilice la directiva
       * <pre>
       *
        Config.name = {
          labelText:'El Nombre',
          requiredText:'Pon el campo oe',
          order:1
        };

        Config.arrayPath = {
          labelText:'Las propiedades',
          requiredText:'Pon el campo oe',
          order:5,
          titleArray:'Propiedades del documento',
          addItemToArray:'Agrega una nueva propiedad',
          deleteArrayItemBtn:'Borra esta propiedad',
          path:{
            labelText:'Nombre dentro de una propiedad',
            requiredText:'No seay choclo',
            order:1
          }
        }
       * </pre>
       *
       *
       * ** Ejemplo de un path **
       * <pre>
       *     {
       *        instance: 'String',
       *        path: 'name',
       *        attrs:{
       *            schema:'schema.name',
       *            model:'model.name',
       *            for:'formulario',
       *            name:'name',
       *            label-text:'{{config.name.labelText}}',
       *            requierd-text:'{{config.name.requiredText}}',
       *            order:'{{config.name.order}}'
       *        },
       *        ...
       *     }
       * </pre>
       *
       *  **Funciones utilizadas**
       * - .map();
       * @param {Array} Schema es el schema de mongodb pasado a un array por la funcion {@link flujorestApp.directive:SchemaToForm#methods_schemaToArray **schemaToArray**}
       * @returns {Array} Array of objects
       */
        //TODO : revisar la prop attrs en los instance:'Array'
      setAttrs: function (config) {
        return function (schm){
          return schm.map(function (s) {

            s.attrs={
              'schema':'schema.'+s.path,//schema path
              'model':'model.'+s.path,//model path
              'for':'formrandom',
              'name':s.path+Math.floor(Math.random()*1000000),
              'label-text': config[s.path] && config[s.path].labelText? '{{config.'+s.path+'.labelText}}' : s.path,
              'required-text': config[s.path] && config[s.path].requiredText? '{{config.'+s.path+'.requiredText}}' : s.path,
              'order': config[s.path] && config[s.path].order? config[s.path].order : 100
            };

            if(s.instance==='Array'){

              s.schema.paths = s.schema.paths.map(function (p) {
                var isSet = config[s.path]&& config[s.path][p.path];
                  p.attrs={
                    'schema':'schema.'+ s.path+'.schema.paths.'+p.path,//schema path
                    'model':'model.'+ s.path+'[k].'+p.path,//model path
                    'for':'formrandom',
                    'name':s.path+p.path+Math.floor(Math.random()*1000000)+'itemnumber{{k}}',
                    'label-text':isSet&&config[s.path][p.path].labelText ? '{{config.'+s.path+'.'+p.path+'.labelText}}' : p.path,
                    'required-text':isSet&&config[s.path][p.path].requiredText ? '{{config.'+s.path+'.'+p.path+'.requiredText}}': p.path,
                    'order':isSet&&config[s.path][p.path].order ? config[s.path][p.path].order : 100
                  };
                return p;
              });
            }
            return s;
          });
        };
      },

      /**
       * @ngdoc method
       * @name orderInputs
       * @methodOf flujorestApp.factory:SchemaToForm
       * @description
       * Esta funcion ordena todos los objetos dentro de un array, utilizando la propiedad "order".
       *
       * **Proceso**
       * - Toma un parámetro {Config} de primer nivel con el orden de los inputs
       * - Toma un parámetro [Schema] de segundo nivel con los paths
       * - Ordena los paths (`schema.paths`) dentro de los objeto con propiedad `instance: 'Array'`. Utiliza propiedad `attrs.order: Number` para ordenar.
       * - Ordena los paths con la propiedad `attrs.order: Number`
       *
       * **Funciones utilizadas dentro de este metodo**
       * - .forEach();
       * - _.sortBy();
       *
       *  **Forma de la función**
       *  <pre>
       *      function({Config}){
       *        return function([Schema]){
       *          return [];
       *        }
       *      }
       *  </pre>
       * @param {Object} Config Objeto con paths.order;
       * @param {Array} Schema Array of objects
       * @returns {Array} Array of objects
       */
      orderInputs: function (config) {
        return function (schm) {

          //_.sortBy(schm, function (s) {

         // });

          // ordena los inputs dentro del objeto con instance 'Array'
          schm.forEach(function (a,i) {
            if(a.instance==='Array'){
              schm[i].schema.paths = _.sortBy(a.schema.paths,
                function (d) {
                  return d.order;
/*                  if(config[a.path] && config[a.path][d.path] && config[a.path][d.path].order){
                    return config[a.path][d.path].order;
                  }else{
                    return 100;
                  }*/
                }
              );
            }
          });

          //ordena los objetos de primer nivel del array y realiza el return;
          return _.sortBy(schm, function (a) {
            //return config[a.path]!==undefined ? config[a.path].order : 100;
            return a.order;
          });
        };
      },

      /**
       * @ngdoc method
       * @name setInput
       * @methodOf flujorestApp.factory:SchemaToForm
       * @param {Array} ArrayFunc esta compuesto de objetos con una estructura determinada
       * @param {Object} element DOM element. La función principal es utilizar algunos elementos desde el template
       * para aplicar formatos a todos los elementos, sobre todo a los de instancia array.
       * @returns {Function} funcion que toma el schema array
       * @description
       * Funcion que recibe funciones en un array para pasar una determinada instancia/path del schema a html
       *
       * ## Estructura ArrayFunc
       * <pre>
       *     [
       *        {
       *          path:'',
       *          instance:'',
       *          parentPath:'',
       *          func:function(){}
       *        }
       *     ]
       * </pre>
       *
       * ## Elementos del templateUrl utilizados en esta sección accesibles a traves del argumento 'element'.
       * - #array: encierra a los elementos que se encuentran dentro de un array
       *    - #titlearray: Es el título general de la instance:'Array'
       *    - #arrayblock: Bloque que se repite según las propiedades que existan o que se creen
       *      - #titleblock: Título del bloque
       *      - #inputblock: Lugar donde va inserto el input
       *      - #deleteblock: Botón que elimina un item
       * - #addproperty: Boton que agrega una propiedad
       *
       *
       * **Proceso**
       * - Pasa los argumentos ArrayFunc y element a la function primaria
       * - Pasa el schema array a la función secundaria
       * - Match entre elementos de ArrayFunc y Schema a través de `instance/path`
       *
       *  TODO: Hacer input por defecto
       */
      setInput: function (ArrayFunc, element){

        function instanceToHtml(path, nivel) {
          var arr = ArrayFunc
            .filter(function (f) {
              var l;
              switch (nivel){
                case 1:
                  l=!f.parentPath && !f.path&& !f.instance && !f.func;
                  break;
                case 2:
                  l=!f.parentPath && !f.path&& f.instance===path.instance && f.func;
                  break;
                case 3:
                  l=!f.parentPath && f.path===path.path&& f.instance===path.instance && f.func;
                  break;
                case 4:
                  l=f.parentPath && f.path===path.path&& f.instance===path.instance && f.func;
              }
              return l;
            })
            .filter(function (f2) {
              //remove a instance wich mismatch with current path
              return f2.instance ===path.instance;
            });

          // si existe más de un objeto similar
          if(arr.length>1){console.warn('El array con funciones de configuración de inputs tiene al menos una propiedad duplicada o similar a otra dentro del mismo objeto')}

          //asigna la función del primer objeto filtrado
          // si la instancia es un Array, asigna un empty string
          return arr.length > 0 ? arr[0].func(path) : false;
        }


        return function (schm) {
          return schm
            .map(function (sc) {

              sc.html= instanceToHtml(sc,4) || instanceToHtml(sc,3) ||instanceToHtml(sc,2) || false;

              if(sc.instance==='Array'){
                sc.schema.paths = sc.schema.paths.map(function (w) {
                  w.html = instanceToHtml(w,4) || instanceToHtml(w,3) ||instanceToHtml(w,2) || '';
                  return w;
                });
              }

              return sc;
            })
            .map(function (sc) {
              if(sc.instance==='Array'){

                // crear o tomar elementos
                var contentProps = element.find('.array-formschema').clone();
                var titleProps = contentProps.find('.titlearray-formschema');

                var blockProp = contentProps.find('.arrayblock-formschema');
                var titleBlockProp = contentProps.find('.titleblock-formschema');
                var inputBlock = contentProps.find('.inputblock-formschema').empty();
                var deleteBlockBtn = contentProps.find('.deleteblock-formschema');
                var addPropBtn = contentProps.find('.addproperty-formschema');

                // configurar elementos
                titleProps
                  .text('{{config.'+sc.path+'.titleArray ||  "" }}');

                titleBlockProp
                  .text('{{config.'+sc.path+'.titleBlock + " "+ (k+1) ||  "" }}');

                deleteBlockBtn
                  .text('{{config.'+sc.path+'.deleteArrayItemBtn ||  "Erase item" }}')
                  .attr({'ng-click':'model.'+sc.path+'.splice(k,1)'});

                addPropBtn
                  .attr({'ng-click':'model.'+sc.path+' ? true : model.'+sc.path+'=[]; model.'+sc.path+'.push({});'})
                  .text('{{config.'+sc.path+'.addItemToArray || "Add item"}}');

                blockProp
                  .attr({'ng-repeat':'(k,v) in model.'+sc.path });

                sc.schema.paths.forEach(function (p) {
                  if(p.html){ inputBlock.append(p.html);}
                }); // end forEach

                // ensamble
                blockProp.append([titleBlockProp,inputBlock,deleteBlockBtn]);

                contentProps.append([titleProps,blockProp,addPropBtn]);

                sc.html = contentProps;

              }
              return sc;
              //console.log(sc.html);
              /*var isPresent = function (prop) {
               //chequea si es un instance Array
               if(prop==='parentPath' && sc.instance !=='Array' ){return false;}

               return ArrayFunc.map(function (fn) {return fn[prop];}).indexOf(sc[prop])>-1;
               };

               //existe match con parentPath, isArray, hasOwnProperty
               //existe match con path
               //existe match con instance

               if(isPresent('parentPath')){
               sc.schema.paths = sc.schema.paths.map(function (p) {
               if(isPresent()){

               }
               });
               }

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
               return '';*/
            });
        };
      },

      /**
       * @ngdoc method
       * @name schmToForm
       * @methodOf flujorestApp.factory:SchemaToForm
       * @param element
       * @returns {Function}
       * @description
       * Esta función recibe como argumento de primer nivel el objeto DOM 'element' donde se encuentra el template del formulario.
       *
       * Como argumento de segundo nivel recibe el array de paths (schema), cada uno con la propiedad html. También se setean los atributos de los botones con sus funciones correspondientes.
       *
       */
      schmToForm: function (element) {
        return function(schm){
          //console.log('Entrada schmToForm');
          //console.log(schm);

          //crear o tomar elementos
          var formulario =element.find('form').clone().removeAttr('id');
          var formTitle = formulario.find('.formTitle-formschema');
          var formGroup = formulario.find('.formgroup-formschema').empty();
          var submitBtn = formulario.find('.submit-formschema');

          //configure elements
          formulario
            .attr({
              'novalidate':true,
              'ng-submit':'submit()',
              'name':'formrandom'
            });

          formTitle
            .text('{{ config.formTextContent.mainTitle ||"Nuevo titulo"}}');

          var disabled = 'formrandom.$invalid';
          submitBtn
            .attr({
              'type':'submit',
              'name':'submiting',
              'value':'submit',
              'ng-disabled':disabled
            })
            .text('{{config.formTextContent.submitBtn || "Send form"}}');

          schm.forEach(function (s) {
            if(s.html){formGroup.append(s.html);}
          });

          return formulario;
        };
      },
      compileToScope: function ($compile,element, scope) {
        return function (html){
          //elimina html del template
          element.empty();
          $compile(html)(scope);
          element.append(html);
        };
      }
    };
  });
