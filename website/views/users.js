var users = function(conf){
        conf = conf || {}
}

users.prototype.index = function(res, object){
        res.render('index',{});
}

module.exports = users;
