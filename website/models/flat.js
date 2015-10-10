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
