const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
  }
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);
