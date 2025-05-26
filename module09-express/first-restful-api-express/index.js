import express from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from './controllers/products.js';

const app = express();

const port = 3000;

//incoming request will have a JSON body
app.use(express.json());

// /products
app.route('/products').get(getAllProducts).post(createProduct);

// /products/:id

app.route('/products/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
