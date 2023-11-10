import productsModel from './models/products.model.js';

export default class Products {
    constructor() {
        console.log('BDD products connected')
    }

    getAll = async () => {
        const result = await productsModel.find();
        return result
    }

    save = async (product) => {
        await productsModel.create(product)
    }

    getById = async (id) => {
        const result = await productsModel.findById(id)
        return result
    }

    delete = async (id) => {
        const product = await productsModel.findById(id);
        await productsModel.deleteOne(product)
    }
}