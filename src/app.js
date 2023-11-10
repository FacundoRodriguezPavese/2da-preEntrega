import express from 'express';
import productsRouter from './routers/products.router.js';
import handlebars from 'express-handlebars'
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import __dirname from './utils.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.get('/', productsRouter)

app.listen(8080, () => {console.log('listening on port 8080')})