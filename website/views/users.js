var users = function(conf){
        conf = conf || {}
}

users.prototype.index = function(res, object){
        res.render('index', {});
}
users.prototype.login = function(res, object){
        res.render('login',{});
}
users.prototype.main = function (res, object) {
  res.render('main', object)
}
users.prototype.perfil = function (res, object) {
  res.render('perfil', {object})
}

module.exports = users;
