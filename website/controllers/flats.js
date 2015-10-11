var View = require("../views/flats");
var flats = function(conf){
        conf = conf || {}

        this.view = new View();
        //this.model = new Model();

        this.response = function(){
		this[conf.funcionalidad](conf.req, conf.res, conf.next)
	}
}
flats.prototype.get_addflat = function(req, res, next){

        this.view.addflat(res, {});
}

module.exports = flats;
