const {Schema} = require ('mongoose');

const localesSchema = new Schema({
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
});

localesSchema.statics.list= async function () {
    return await this.find()
};

localesSchema.statics.get = async function (id) {
    return await this.findById(id)
};

localesSchema.statics.insert = async function (data) {
    return await this.create(data)
};

localesSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id)
};

const LocalesS = mongoose.model('LocalesS', localesSchema);

export default LocalesS;