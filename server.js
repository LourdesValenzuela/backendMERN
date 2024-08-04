// Importa y configura dotenv
require('dotenv').config();

// Importa los módulos necesarios
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mascotaRoutes = require('./server/routes/mascota.routes');
const port = process.env.PORT || 1000;
// Crea una instancia de la aplicación Express
const app = express();

// Usa 'cors' para permitir solicitudes desde diferentes dominios
app.use(cors());

// Configura el servidor para analizar solicitudes con JSON
app.use(express.json());

// Configura el servidor para analizar solicitudes con datos codificados en URL (formulario)
app.use(express.urlencoded({ extended: true }));

// Maneja los errores globales en la aplicación
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Algo salió mal!');
});

// Usa las rutas de mascotas bajo el prefijo '/mascotas'
app.use('/mascotas', mascotaRoutes);

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch(err => console.log('Error al conectar a la base de datos:', err));


app.listen(port, () => {
  console.log(`Listening at Port ${port}`);
});

