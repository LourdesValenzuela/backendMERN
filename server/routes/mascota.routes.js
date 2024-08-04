const express = require('express'); 
const router = express.Router(); 
const mascotaController = require('../controllers/mascota.controller'); 

// Ruta para obtener todas las mascotas
router.get('/', mascotaController.getAllMascotas);

// Ruta para crear una nueva mascota
router.post('/', mascotaController.createMascota);

// Ruta para obtener una mascota por ID
router.get('/:id', mascotaController.getMascotaById);

// Ruta para eliminar una mascota por ID
router.delete('/:id', mascotaController.deleteMascota);

// Ruta para actualizar una mascota por ID
router.put('/:id', mascotaController.updateMascota);

// Ruta para manejar el "like" de una mascota
router.post('/:id/like', mascotaController.likeMascota);

// Ruta para obtener mascotas por tipo
router.get('/type/:type', mascotaController.getMascotasByType);

module.exports = router; 

