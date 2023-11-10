import { Router } from 'express';
import productsModel from '../dao/dbManager/models/products.model.js';

const router = Router();

router.get('/products', async (req, res) => {
    const { page = 1 } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: 5, page, lean: true });

    res.render('products', {
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    });
});

export default router