var twitterStrategy = require('passport-twitter').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var confLogin = require('./configLogin');
var passport = require('passport');
var pg = require('pg');
var conf = require('./conf');

//muy bien, estas funciones son estandares
module.exports = function(passport){
        //serializa al usuario para ponerlo en la sesion
        passport.serializeUser(function(user, done){
                done(null, user);
        });

        //deserializa al usuario para poder utilizarlo
        passport.deserializeUser(function(obj, done){
                done(null, obj);
        });

        passport.use(new twitterStrategy({
                consumerKey: confLogin.twitter.key,
                consumerSecret: confLogin.twitter.secret,
                callbackURL: '/auth/loginTwitterAuth'
        },function(accessToken, refreshToken, profile, done){
                //el objeto profile es el que trae todos los datos
                //en este caso solo vamos a poner el profile.displayName que es el nombre de usuario
                console.log(profile);

                var client = new pg.Client(process.env.DATABASE_URL || conf.dataBase.url);
                var idUsr = 0;

                client.connect();
                var query = client.query('SELECT COALESCE(MAX(idusers), 0) FROM users;');

                query.on('row', function(row){
                        idUsr = row.coalesce + 1;
                });

                query.on('end', function(){
                        var insertar = client.query('INSERT INTO users(idusers, name, provider, providerid, photo, createdat) VALUES ($1, $2, $3, $4, $5, $6)',
                                [idUsr, profile.username, 1, profile.id, profile._json.profile_image_url, null]);

                        insertar.on('end', function(){
                                client.end();
                        })
                });

                return done(null, {
                        name: profile.displayName
                })
        }));

        passport.use(new facebookStrategy({
                clientID: confLogin.facebook.key,
                clientSecret: confLogin.facebook.secret,
                callbackURL: '/auth/loginFacebookAuth',
                profileFields: ['id', 'displayName', 'name', 'photos', 'profileUrl']
        },function(accessToken, refreshToken, profile, done){
                console.log('si logueo');
                console.log(profile.displayName);
                console.log(profile._json.picture.data.url);
                console.log(profile);
                return done(null, {
                        name: profile.displayName
                })
        }));
}
