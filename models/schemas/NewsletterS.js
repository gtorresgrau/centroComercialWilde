const {Schema} = require ('mongoose');

const newsletterSchema = new Schema({
    email: String,
});

newsletterSchema.statics.list= async function () {
    return await this.find()
};

newsletterSchema.statics.get = async function (id) {
    return await this.findById(id)
};

newsletterSchema.statics.insert = async function (data) {
    return await this.create(data)
};

newsletterSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id)
};


const NewsletterS = mongoose.model("NewsletterS", newsletterSchema);

export default NewsletterS;