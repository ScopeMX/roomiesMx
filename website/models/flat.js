var pg = require('pg')

var stringConnection = process.env.DATABASE_URL || 'posgres://localhost:5432/roomies'

var flats = function(conf){
        conf = conf || {}
}

//Aquí empiezan las funciones de Elioth :)
users.prototype.insertFlat = function(data, callback){
        //Data: Addres-Dirección donde se ubica el depa.
        //capacity: Capacidad del depa
        //occupation: Lugares ya ocupados en el depa.
        //price: Precio de la renta depa
        //description: Descripción del depa
        //sex_filter: Filtro de sexo, 0 mixto, 1 solo mujeres, 2 solo hombres
        //near_of: Escuela al que se encuentra cercano el depa
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
                        var insertar = client.query("insert into flats (address, capacity, occupation, price, description, sex_filter) values($1, $2, $3, $4, $5, $6)",
                        [data.address, data.capacity, data.occupation, data.price, data.description, data.sex_filter])

                        insertar.on('row', function(row){})

                        insertar.on('end', function(){
                                callback(null, data)
                                client.end()
                        })
                        
                        var insertarRelacion=client.query("",[]);
                }
                else{
                        callback(null, data)
                        client.end()
                }
        })
}

module.exports = flats