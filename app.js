var express = require('express'),
    swig = require('swig'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    configRoutes = require('./routes/config-routes'),
    configSwig = require('./config/config-swig'),
    systemParams = require('./config/system-params.json');

var app = express();

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', !systemParams.isDevMode);
configSwig(swig);

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public/libs'));
app.use(express.static(__dirname + '/public/images'));

if (systemParams.isDevMode) {
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public/javascripts'));
  app.use(express.static(__dirname + '/public/styles'));
} else {
  app.use(express.static(__dirname + '/public/compiled/styles'));
  app.use(express.static(__dirname + '/public/compiled/javascripts'));
}

configRoutes(app);

console.log('start server on port[' + systemParams.port + ']');
app.listen(systemParams.port);