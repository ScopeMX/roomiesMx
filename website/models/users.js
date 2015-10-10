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
                                var insertar = client.query("INSERT INTO users(id_user, id_provider, provider, name, type, photo, phone, email, complete, id_school)",
                                [idUsr, data.id, data.provider, data.name, 0, data.photo, "", "", false, 0])

                                insertar.on('row', function(row){})

                                insertar.on('end', function(){
                                        callback(null, data)
                                        client.end()
                                })
                        })
                }
                else{
                        callback(null, data)
                        client.end()
                }
        })
}

users.prototype.setTypeUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var query = client.query("UPDATE users SET type = $1 WHERE id_provider = $2;", [data.type, data.provider]);

        query.on('row', function(row){})

        query.on('end', function(){
                callback({})
                client.end()
        })
}

users.prototype.completeUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var query = client.query("UPDATE users SET email = $1, phone = $2, school = $3, complete = $4; WHERE id_provider = $5", [data.email, data.phone, data.school, true, data.idprovider])

        query.on('row', function(row){})

        query.on('end', function(){
                callback({})
                client.end()
        })
}

users.prototype.getUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var existe = false
        var info
        var query = client.query("SELECT * FROM users WHERE id_provider = $1;", [data])

        query.on('row', function(row){
                existe = true
                info = row
        })

        query.on('end', function(){
                if(!existe){
                        callback(info)
                        client.end()
                }
                else{
                        callback({
                                status: "El usuario no existe"
                        })
                        client.end()
                }
        })
}

























//Aquí empiezan las funciones de Elioth :)
users.prototype.insertFlat = function(data, callback){
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
                        var insertar = client.query("INSERT INTO flats(id_user, id_provider, provider, name, type, photo, phone, email, complete, id_school) values()",
                        [idUsr, data.id, data.provider, data.name, 0, data.photo, "", "", false, 0])

                        insertar.on('row', function(row){})

                        insertar.on('end', function(){
                                callback(null, data)
                                client.end()
                        })
                }
                else{
                        callback(null, data)
                        client.end()
                }
        })
}



module.exports = users
