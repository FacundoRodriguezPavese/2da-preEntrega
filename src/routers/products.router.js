import Router from 'express';
import productsManager from '../dao/dbManager/products.manager.js';
import productsModel from '../dao/dbManager/models/products.model.js';

const router = Router();

router.get('/', async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query;

    const options = {
        page: page,
        limit: limit,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    }

    const filter = query ? { category: query, status: true } : { astatus: true }

    try {
        const result = await productsModel.paginate(filter, options);

        res.send({
            status: 'success', payload: {
                docs: result.docs,
                totalPages: result.totalPages,
                prevPage: result.hasPrevPage ? result.prevPage : null,
                nextPage: result.hasNextPage ? result.nextPage : null,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null
            }
        })
    } catch (error) {
        res.send({ status: 'error', error: 'mi error en el res.send' })
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const result = await productsManager.getById(id);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.send({ status: 'error', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productsManager.save(product);
        res.send({ status: 'success', payload: product })
    } catch (error) {
        res.send({ status: 'error', error: error })
    }
});

export default router