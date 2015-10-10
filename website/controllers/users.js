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

        this.view.index(res, {});
}
users.prototype.get_login = function(req, res, next){
        this.view.login(res, {});
}

users.prototype.get_main = function (req, res, next) {
  var object={
    user: req.user
  }
  var self = this;
  this.model.getUser(req.user.id, function (data) {
    if(!data && data.complete === true) {
      self.view.main(res, object);
    } else {
      self.view.perfil(res, object);
    }
  });
};

module.exports = users;
