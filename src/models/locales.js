import mongoose from 'mongoose';

const localSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
      },
      contacto: {
        type: String,
        required: true
      },
      celular: {
        type: Number,
        required: true
      },
      linea: {
        type: Number,
        default: 0
      },
      ubicacion: {
        type: String,
        required: true
      },
      categoria: {
        type: String,
        required: true
      },
      rubro: {
        type: String,
        required: true
      },
      rubroSecundario: {
        type: String,
        default: 'No tengo'
      },
      horarios: {
        type: String,
        required: true
      },
      logoLocal: {
        type: String,
        required: true
      },
      fotoLocal: {
        type: String,
        required: true
      },
      instagram: {
        type: String,
        default: 'No tengo'
      },
      facebook: {
        type: String,
        default: 'No tengo'
      },
      web: {
        type: String,
        default: 'No tengo'
      },
      texto: {
        type: String,
        default: ''
      }

});

const Local = mongoose.models.Local || mongoose.model('Local', localSchema);

export default Local;
