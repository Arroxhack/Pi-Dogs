const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // ojo que no haga falta cambiar por estar deprecated
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { application } = require('express');

require('./db.js'); // mio: requerimos todo de la base de datos para hacer la conexion con postgres

const server = express(); // mio: instancia de express a utilizar

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' })); // mio: aca cambie bodyParser por express porque esta deprecado
server.use(express.json({ limit: '50mb' })); // mio: aca cambie bodyParser por express porque esta deprecado
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => { // mio: todo esto es configuracion de cors
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from // mio: en caso de algun problema cambiamos http://localhost:3000 por *
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); // mio: el server va a usar en "/" las rutas traidas de './routes/index.js' // '/api'

/* application.get("/", (req, res) => { // mio
  try{
  //codigo
  }
  catch(err){
      //si fallo
  next(err) // esto lo hago porque aca abajo tengo un manejador de errores, de esta forma no tengo que hacer un console.log (e) en todos los lugares.
  }
}) */

// Error catching endware. // mio: esto captura errores
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server; // mio: exportamos la instancia de express
