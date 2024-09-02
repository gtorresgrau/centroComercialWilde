const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    dni:{
        type: String,
        required: true,
        unique: true, 
    },
    celular:{
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
    },
    chw:{
        type: Boolean,
        required: true, 
    },
    torre: {
        type: String,
        required: true,
    },
    piso: {
        type: String,
        required: true,
    },
    depto: {
        type: String,
        required: true,
    },
    aceptar: {
        type: Boolean,
        required: true,
    }
},{ timestamps: true });


const ContactoSorteo = mongoose.models.ContactoSorteo ||  mongoose.model('ContactoSorteo', sorteoSchema);

module.exports = ContactoSorteo;
