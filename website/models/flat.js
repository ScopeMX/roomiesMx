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
                        //Metemos información del depa a la tabla
                        var insert = client.query("insert into flats (address, capacity, occupation, price, description, sex_filter) values($1, $2, $3, $4, $5, $6);",
                        [data.address, data.capacity, data.occupation, data.price, data.description, data.sex_filter])

                        insert.on('row', function(row){})

                        insert.on('end', function(){

                                //Obtenemos el id del departamento que acabamos de registrar (Necesitamos corregir esto)
                                var id_flat;
                                var getId_flat=client.query("select COALESCE(MAX(id_flat), 0) FROM flats;");

                                getId_flat.on('row', function(row){
                                        id_flat=row.coalesce;//Asignamos el id más reciente de del depa
                                })

                                getId_flat.on('end', function(){
                                        //Insertamos la relación de lender_flat
                                        var insertLender_Flat=client.query("insert into lender_flat (id_lender, id_flat) values($1, $2);",
                                        [data.providerid, id_flat]);
                                        insertLender_Flat.on('row', function(row){})
                                        //Función que relaciona flat_school
                                        insertLender_Flat.on('end', function(){
                                                        var insertFlat_School=client.query("insert into flat_school (id_flat, id_school) values($1, $2);",
                                                                [id_flat, data.near_of]);
                                                        insertFlat_School.on('row', function(row){})

                                                        insertFlat_School.on('end', function(){
                                                                callback(null, data)
                                                                client.end()
                                                        
                                                        })  

                                                        
                                        })
                                })


                        })
                }
                else{
                        callback(null, data)
                        client.end()
                }
        })
}

users.prototype.insertPhoto = function(data, callback){
        //Data:
        //Debe traer el id_flat del departamento al que se va a subir la foto
        //address: Es la url donde se guardada la imagen
        var client = new pg.Client(stringConnection)
        client.connect()

        var existe = false;

        var query = client.query("SELECT * FROM users WHERE id_provider = $1;", [data.providerid])

        query.on('row', function(row){
                existe = true
        })
        //Después de haber validado que existe el usuario hacemos la función
        query.on('end', function(){
                var insertPhoto_flat=client.query("insert into photos (id_flat, address)",
                        [data.id_flat, data.address]);
                insertPhoto_flat.on('row', function(row){})
                insertPhoto_flat.on('end', function(){
                        callback(null, data)
                        client.end()   
                })
        })
}
        



//NECESITA: id de la escuela de la que quieres depas cercanos, solo eso
flats.prototype.getAllFlats = function(data, callback){
        var client = new pg.Client(stringConnection)
        client.connect()

        var response = new Array();

        var query = client.query("SELECT * FROM flat_school JOIN flats ON(flat_school.id_flat = id_flat); WHERE id_school = $1", [data])

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
