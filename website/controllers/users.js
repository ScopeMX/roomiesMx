var View = require("../views/users")
var Model = require('../models/users')

var users = function(conf){
        conf = conf || {}

        this.view = new View();
        this.model = new Model();

        this.response = function(){
		this[conf.funcionalidad](conf.req, conf.res, conf.next)
	}
}

users.prototype.get_index = function(req, res, next){
  var object={
    user: req.user
  }
        this.view.index(res, object);
}
users.prototype.get_login = function(req, res, next){
        this.view.login(res, {});
}

module.exports = users;
