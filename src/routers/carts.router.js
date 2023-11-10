import Router from 'express';
import Carts from '../dao/dbManager/cart.manager.js';
import Products from '../dao/dbManager/products.manager.js';

const router = Router();
const cartsManager = new Carts;
// const productsManager = new Products;


router.post('/', async (req, res) => {
    try {
        const cart = await cartsManager.addCart();
        res.status(201).send({ status: 'succes', payload: cart });
    } catch (error) {
        res.send({ status: 'error', error: error })
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartsManager.getById(req.params.cid).populate('products.product');
        res.send({ status: 'success', payload: cart });
    } catch (error) {
        res.send({ status: 'error', error: error })
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartsManager.getById(cartId);
        const productIndex = cart ? cart.products.findIndex(p => p.product.toString() === productId)
            : res.send({ status: 'error', error: 'Cart not found' });

        productIndex === -1 ? cart.products.push({ product: productId, quantity: 1 })
            : cart.products[productId].quantity + 1;

        const updateCart = await cartsManager.addProductToCart(cartId, cart.products[productId])

        res.send({ status: 'success', payload: updateCart })
    } catch (error) {
        res.send({ status: 'error', error: 'error en el post de un producto a un carrito' })
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const result = await cartsManager.setQuantity(productId, newQuantity);
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.send({ status: 'rerror', error: error })
    }
});


router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await cartsManager.addProductToCart(cartId, []);

        res.send({status:'succes', payload: result})
    } catch (error) {
        res.send({ status: 'rerror', error: error })
    }
})



// Revisar y arreglar en caso de que este mal

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartsManager.getById(cartId);


        cart.deleteOne(productId);

        res.send({ status: 'success', payload: `producto ${productId} eliminado del cart` })

    } catch (error) {
        res.send({ status: 'error', error: error })
    }
});

export default router