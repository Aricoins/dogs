const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');

require('./db.js');

const server = express();

server.name = 'API';
// Configuración segura de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'https://nuevamascota.vercel.app'
];

server.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, aplicaciones móviles)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

// Error catching endware - manejo seguro
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  
  // Log completo del error para debugging (solo en desarrollo)
  if (process.env.NODE_ENV !== 'production') {
    console.error('🚨 Error completo:', err);
  } else {
    console.error('🚨 Error:', err.message);
  }
  
  // Respuesta segura al cliente
  const safeMessage = status === 500 
    ? 'Error interno del servidor' 
    : err.message || 'Error desconocido';
    
  res.status(status).json({ 
    error: safeMessage,
    status: status
  });
});

module.exports = server;
