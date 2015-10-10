var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');
var middlewares = require('./middlewares/admin');
var router = require('./website/router');

var ExpressServer = function(config){
	config = config || {}

	this.expressServer = express()


	//setting the body-parser
	this.expressServer.use(bodyParser.urlencoded({extended:true}))

	//the rest of the middlewares
	for(var middleware in middlewares){
		this.expressServer.use(middlewares[middleware])
	}

	//setting swig
	this.expressServer.engine('html', swig.renderFile)
	this.expressServer.set('view engine', 'html')
	this.expressServer.set('views', __dirname + '/website/views/templates')


	for(var controller in router){
		for(var funcionalidad in router[controller].prototype){
			var method = funcionalidad.split('_')[0]
			var entorno = funcionalidad.split('_')[1]
			var data = funcionalidad.split('_')[2]
				data = (method == 'get' && data !== undefined) ? ':data' : ''

			var url = '/' + controller + '/' + entorno + '/' + data
			this.router(method, funcionalidad, url, controller)
		}
	}
}

ExpressServer.prototype.router = function(method, funcionalidad, url, controller){
	console.log(url)
	this.expressServer[method](url, function(req, res, next){
		var conf = {
			'funcionalidad': funcionalidad,
			'req': req,
			'res': res,
			'next': next
		}
		var Controller = new router[controller](conf)
		Controller.response()
	})
}

module.exports = ExpressServer
