var http = require('http'),
        expressServer = require('./ExpressServer'),
        conf = require('./conf');

var app = new expressServer();

var server = http.createServer(app.expressServer);

server.listen(process.env.PORT || conf.port);
