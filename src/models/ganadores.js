const mongoose = require('mongoose');

const GanadoresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    torre: {
        type: String,
        required: true,
    },
    CHW:{
        type: Boolean,
        required: true
    },
    actual:{
        type: Boolean,
    }
});

const Ganadores = mongoose.models.Ganadores || mongoose.model('Ganadores', GanadoresSchema);

export default Ganadores
