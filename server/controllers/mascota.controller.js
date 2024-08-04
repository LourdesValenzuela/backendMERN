// Importa el modelo 'Mascota' para interactuar con la colección de mascotas en MongoDB
const Mascota = require('../models/mascota.model');

// Controlador para obtener todas las mascotas
module.exports.getAllMascotas = async (req, res) => {
    try {
        // Obtiene todas las mascotas de la base de datos
        const mascotas = await Mascota.find().exec();
        // Envía la lista de mascotas al cliente en formato JSON
        res.json(mascotas);
    } catch (error) {
        // En caso de error, responde con estado 500 y el mensaje del error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear una nueva mascota
module.exports.createMascota = async (req, res) => {
    try {
        // Extrae el nombre, tipo, descripción y habilidades del cuerpo de la solicitud
        const { name, type, description, skills } = req.body;

        // Verifica si ya existe una mascota con el mismo nombre
        const existingMascota = await Mascota.findOne({ name }).exec();
        if (existingMascota) {
            // Responde con un error 400 si ya existe una mascota con ese nombre
            console.log(`Error: A pet with the name "${name}" already exists.`);
            return res.status(400).json({ message: 'A pet with this name already exists' });
        }

        // Crea una nueva instancia de la mascota con los datos proporcionados
        const nuevaMascota = new Mascota({ name, type, description, skills });

        // Guarda la nueva mascota en la base de datos
        await nuevaMascota.save();
        // Responde con la nueva mascota y estado 201 (creado) si la operación es exitosa
        res.status(201).json(nuevaMascota);
    } catch (error) {
        if (error.code === 11000) {
            // Maneja errores de índice único (duplicado)
            console.log(`Error: A pet with the name "${req.body.name}" already exists.`);
            res.status(400).json({ message: 'A pet with this name already exists' });
        } else {
            // Maneja otros errores con estado 500
            console.error('Error adding pet:', error.message);
            res.status(500).json({ message: error.message });
        }
    }
};

// Controlador para obtener una mascota por ID
module.exports.getMascotaById = async (req, res) => {
    try {
        // Busca la mascota por su ID
        const mascota = await Mascota.findById(req.params.id).exec();
        if (!mascota) {
            // Responde con un error 404 si la mascota no se encuentra
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        // Responde con la mascota encontrada en formato JSON
        res.json(mascota);
    } catch (error) {
        // Maneja errores con estado 500
        console.error('Error fetching pet by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar una mascota por ID
module.exports.deleteMascota = async (req, res) => {
    console.log('ID recibido para eliminar:', req.params.id);
    try {
        // Elimina la mascota por su ID
        const result = await Mascota.findByIdAndDelete(req.params.id).exec();
        if (!result) {
            // Responde con un error 404 si la mascota no se encuentra
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        // Responde con un mensaje de éxito si la eliminación es exitosa
        res.json({ message: 'Mascota adoptada con éxito' });
    } catch (error) {
        // Maneja errores con estado 500
        console.error('Error deleting pet:', error);
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar una mascota por ID
module.exports.updateMascota = async (req, res) => {
    try {
        // Extrae los datos actualizados del cuerpo de la solicitud
        const { name, type, description, skills } = req.body;
        // Actualiza la mascota con el ID proporcionado y los nuevos datos
        const updatedMascota = await Mascota.findByIdAndUpdate(
            req.params.id,
            { name, type, description, skills },
            { new: true } // Devuelve el objeto actualizado
        ).exec();
        
        if (!updatedMascota) {
            // Responde con un error 404 si la mascota no se encuentra
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        
        // Responde con la mascota actualizada en formato JSON
        res.json(updatedMascota);
    } catch (error) {
        // Maneja errores con estado 500
        console.error('Error updating pet by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Controlador para manejar el "like" de una mascota
module.exports.likeMascota = async (req, res) => {
    try {
        // Encuentra la mascota por ID
        const mascota = await Mascota.findById(req.params.id).exec();
        if (!mascota) {
            // Responde con un error 404 si la mascota no se encuentra
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        // Incrementa el contador de likes
        mascota.likes = (mascota.likes || 0) + 1;
        await mascota.save();

        // Responde con el número actualizado de likes y mensaje de éxito
        res.status(200).json({ message: 'Mascota liked successfully', likes: mascota.likes });
    } catch (error) {
        // Maneja errores con estado 500
        console.error('Error liking pet:', error);
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener mascotas por tipo
module.exports.getMascotasByType = async (req, res) => {
    try {
        // Extrae el tipo de la mascota del parámetro de la solicitud
        const { type } = req.params;
        // Busca las mascotas que coinciden con el tipo proporcionado
        const mascotas = await Mascota.find({ type }).exec();
        // Responde con la lista de mascotas en formato JSON
        res.json(mascotas);
    } catch (error) {
        // Maneja errores con estado 500
        console.error('Error fetching pets by type:', error);
        res.status(500).json({ message: error.message });
    }
};
