import cartsModel from './models/carts.model.js';

export default class Carts {
    constructor() {
        console.log('Carts database connected')
    }

    getAll = async () => {
        const result = await cartsModel.find().lean();
        return result
    }

    addCart = async () => {
        await cartsModel.create({})
    }

    getById = async (id) => {
        const result = await cartsModel.findById(id);
        return result
    }

    addProductToCart = async (id, product) => {
        const updatedCart = await cartsModel.findOneAndUpdate(
            { _id: id },
            { $set: { products: product } },
            { new: true, returnNewDocument: true }
        );
        return updatedCart;
    }

    delete = async (id) => {
        await cartsModel.deleteOne({ _id: id });
        return () => console.log('carrito elimindao con exito')
    }

    setQuantity = async (productId, quantity) => {
        const updatedCart = await cartsModel.aggregate([
            { $match: {_id: productId } },
            { $set: { "quantity": quantity } }
        ]);
        return updatedCart
    }
}