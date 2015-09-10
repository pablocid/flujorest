/**
 * Created by pablo on 02-09-15.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
var dir = __dirname+'/';

var port = 8888;
console.log(dir);
console.log('El puerto utilizado es :'+port);
connect().use(serveStatic(dir)).listen(port);
