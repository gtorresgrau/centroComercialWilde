import mongoose, {Schema} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI
console.log('mongodb:',MONGODB_URI)

mongoose.connect(MONGODB_URI);
mongoose.Promise = global.Promise;

const localesSchema = new Schema(
    {
        _id: String,
        local: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: Boolean,
        hidden: Boolean,
        n_local: Number,
        email: String,
        contacto: String,
        celular: Number,
        linea: Number,
        ubicacion: String,
        rubro: String,
        rubroSecundario: String,
        horarios: String,
        logoLocal: String,
        fotoLocal: String,
        instagram: String,
        facebook: String,
        texto: String
    },
    {
        timestamps:false,
    }
);

const LocalesModel = mongoose.model.LocalesModel || mongoose.model("LocalesModel", localesSchema);

export default LocalesModel;