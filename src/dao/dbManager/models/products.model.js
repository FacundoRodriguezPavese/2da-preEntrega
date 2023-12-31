import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String
})

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection,productsSchema)

export default productsModel;