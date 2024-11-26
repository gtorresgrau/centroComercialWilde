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
    },
    localidad:{
        type:String,
    },
    dni: {
        type: String,
        required: true,
    },
    CHW:{
        type: Boolean,
    },
    actual:{
        type: Boolean,
    },
    especial:{
        type: Boolean,
    },
    nombreSorteo:{
        type:String,
    }
});

const Ganadores = mongoose.models.Ganadores || mongoose.model('Ganadores', GanadoresSchema);

export default Ganadores
