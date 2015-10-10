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

//NECESITA: todo user menos photo
users.prototype.completeUser = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var query = client.query("UPDATE users SET provider=$1, name=$2, type = $3, email = $4, complete = $5, id_school = $6 WHERE id_provider = $7",
        [data.provider, data.name, data.type, data.email, true, data.id_school, data.id_provider])

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
