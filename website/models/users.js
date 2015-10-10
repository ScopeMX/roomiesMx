var pg = require('pg')

var stringConnection = process.env.DATABASE_URL

var users = function(conf){
        conf = conf || {}
}

users.prototype.loginUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var existe = false;

        var query = client.query("SELECT * FROM users WHERE id_provider = $1;", [data.providerid])

        query.on('row', function(row){
                existe = true
        })

        query.on('end', function(){
                var idUsr = 0;
                if(!existe){
                        var getId = client.query("SELECT COALESCE(MAX(id_user), 0) FROM users;")

                        getId.on('row', function(row){
                                idUsr = row.coalesce + 1
                        })

                        getId.on('end', function(){
                                var insertar = client.query("INSERT INTO users(id_user, id_provider, provider, name, type, photo, phone, email, complete, id_school)", [data.])
                        })
                }
        })
}

module.exports = users
