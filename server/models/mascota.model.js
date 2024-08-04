const mongoose = require('mongoose');

// Define el esquema para las mascotas
const MascotaSchema = new mongoose.Schema({
    name: {
        type: String, // El tipo de dato es String
        required: [true, "The pet's name is required"], // El campo es obligatorio
        minlength: [3, "Name must be at least 3 characters long"], // Longitud mínima de 3 caracteres
        unique: true // Asegura que el nombre sea único en la base de datos
    },
    type: {
        type: String, // El tipo de dato es String
        required: [true, "The pet type is required"], // El campo es obligatorio
        minlength: [3, "Type must be at least 3 characters long"] // Longitud mínima de 3 caracteres
    },
    description: {
        type: String, // El tipo de dato es String
        required: [true, "Description is required"], // El campo es obligatorio
        minlength: [3, "Description must be at least 3 characters long"] // Longitud mínima de 3 caracteres
    },
    skills: {
        type: [String], // El tipo de dato es un array de Strings
        validate: [arr => arr.length <= 3, "A pet cannot have more than 3 skills"] // Validación para asegurar que no haya más de 3 habilidades
    },
    likes: { 
        type: Number, // El tipo de dato es Number
        default: 0 // Valor por defecto de 0 para los "likes"
    },
}, { timestamps: true }); // Añade automáticamente campos de fecha de creación y actualización

// Crea un índice único en el campo 'name' para garantizar la unicidad
MascotaSchema.index({ name: 1 }, { unique: true });

// Exporta el modelo para usarlo en otras partes de la aplicación
module.exports = mongoose.model('Mascota', MascotaSchema);
