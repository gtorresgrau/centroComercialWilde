import mongoose, {Schema} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI
console.log('mongodb:',MONGODB_URI)

mongoose.connect(MONGODB_URI);
mongoose.Promise = global.Promise;

const newsletterSchema = new Schema(
    {
        email: String,
    },
    {
        timestamps:false,
    }
);

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


const NewsletterModel = mongoose.model("NewsletterModel", newsletterSchema);

export default NewsletterModel;