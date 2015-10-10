var pg = require('pg')

var stringConnection = process.env.DATABASE_URL || 'posgres://localhost:5432/roomies'

var flats = function(conf){
        conf = conf || {}
}

//Aquí empiezan las funciones de Elioth :)
flats.prototype.insertFlat = function(data, callback){
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
                        var insertar = client.query("insert into flats (address, photo, capacity, occupation, price, description, sex_filter) values($1, $2, $3, $4, $5, $6, $7)",
                        [data.address, data.id, data.provider, data.name, 0, data.photo, "", "", false, 0])

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

<<<<<<< HEAD
//NECESITA: id de la escuela de la que quieres depas cercanos, solo eso
flats.prototype.getAllFlats = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var response = new Array();

        var query = client.query("SELECT * FROM rel_flats JOIN flats ON(id_flat = id_flat); WHERE id_school = $1", [data])

        query.on('row', function(row){
                response[response.length] = row
        })

        query.on('end', function(){
                callback(response);
                client.end();
        })
}

//NECESITA: id del flat
flats.prototype.getFlat = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var response;

        var query = client.query("SELECT * FROM flats WHERE id_flat = $1", [data])

        query.on('row', function(row){
                response = row
        })

        query.on('end', function(){
                callback(response);
                client.end();
        })
}


module.exports = flats
=======
module.exports = flats
>>>>>>> a1191ccf421df54aac877a6fa5b4575218df57dc
