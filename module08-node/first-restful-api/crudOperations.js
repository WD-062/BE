import pg from 'pg';
const { Client } = pg;

// Import utility functions
import { getResourceId, processBodyFromRequest, returnErrorWithMessage } from './utils.js';

export const createProduct = async (req, res) => {
  try {
    const body = await processBodyFromRequest(req); // This utility function gets the body for you
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    const parsedBody = JSON.parse(body);
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    const results = await client.query(
      'INSERT INTO products (name, image, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [
        parsedBody.name,
        parsedBody.image,
        parsedBody.description,
        parsedBody.category,
        parsedBody.price,
        parsedBody.stock
      ]
    );
    await client.end();
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows[0]));
  } catch (error) {
    console.error('Error creating product: ', error);
    returnErrorWithMessage(res);
  }
};

export const getProducts = async (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    const results = await client.query('SELECT * FROM products;'); // Select from the right table
    await client.end();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows)); // Return the rows array
  } catch (error) {
    console.error('Error fetching products: ', error);
    returnErrorWithMessage(res);
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    const results = await client.query('SELECT * FROM products WHERE id = $1;', [id]);
    await client.end();
    if (!results.rowCount) return returnErrorWithMessage(res, 404, 'Product not found');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows[0]));
  } catch (error) {
    console.error('Error fetching product: ', error);
    returnErrorWithMessage(res);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const body = await processBodyFromRequest(req);
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    const parsedBody = JSON.parse(body);
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    const results = await client.query(
      'UPDATE products SET name = $1, image = $2, description = $3, category = $4, price = $5, stock = $6 WHERE id = $7 RETURNING *;',
      [
        parsedBody.name,
        parsedBody.image,
        parsedBody.description,
        parsedBody.category,
        parsedBody.price,
        parsedBody.stock,
        id
      ]
    );
    await client.end();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows[0]));
  } catch (error) {
    console.error('Error updating product: ', error);
    returnErrorWithMessage(res);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    await client.query('DELETE FROM products WHERE id = $1;', [id]);
    await client.end();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Product deleted successfully' }));
  } catch (error) {
    console.error('Error deleting product: ', error);
    returnErrorWithMessage(res);
  }
};
