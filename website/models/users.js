var pg = require('pg')

var stringConnection = process.env.DATABASE_URL || 'posgres://localhost:5432/roomies'

var users = function(conf){
        conf = conf || {}
}

users.prototype.loginUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var existe = false;

        var query = client.query("SELECT * FROM users WHERE id_provider = $1;", [data.id])

        query.on('row', function(row){
                existe = true
        })

        query.on('end', function(){
                var idUsr = 0;
                if(!existe){
                        var insertar = client.query("INSERT INTO users(id_provider, provider, name, type, photo, phone, email, complete, id_school) values($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                        [data.id, data.provider, data.name, 0, data.photo, "", "", false, 0])

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

//NECESITA: email, phone, school, idprovider, type
users.prototype.completeUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var query = client.query("UPDATE users SET email = $1, phone = $2, school = $3, complete = $4 type = $5 WHERE id_provider = $5", [data.email, data.phone, data.school, true, data.idprovider, data.type])

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
                if(existe){
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

users.prototype.getSchool = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var response  = new Array()
        var query = client.query("SELECT * FROM schools;");

        query.on('row', function(row){
                response[response.length] = row
        })

        query.on('end', function(){
                callback(response)
                client.end()
        })
}

module.exports = users
