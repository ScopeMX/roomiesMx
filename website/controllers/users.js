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
  //console.log(req.user);
  if(req.user === undefined) {
    console.log("Es undefined");
    this.view.login(res, {});
  } else {
    var self = this;
    this.model.getUser(req.user.id, function (data) {
      if(!data && data.complete === true) {
        if(data.type === 1){
          self.view.main(res, object);
        }else{
          res.redirect('/flats/addflat');
        }
      } else {
        self.view.perfil(res, object);
      }
    });
  }

};

users.prototype.post_perfil = function (req, res, next) {
  var data = {};
  var object={
    user: req.user
  };
  data.email = req.body.email;
  data.phone = req.body.phone;
  data.school = req.body.school;
  data.idprovider = req.user.id;
  data.type = req.body.type;
  var self = this;
  this.model.completeUser(data, function (moy) {
    self.view.main(res, object);
  });
}
module.exports = users;
