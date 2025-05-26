import pool from '../db/index.js';

const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products;');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, image, description, category, price, stock } = req.body;

    if (!name || !image || !description || !category || !price || !stock) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { rows } = await pool.query(
      'INSERT INTO products (name, image, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [name, image, description, category, price, stock]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      rows: [product]
    } = await pool.query('SELECT * FROM products WHERE id = $1;', [id]);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, category, price, stock } = req.body;

    if (!name || !image || !description || !category || !price || !stock) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const {
      rows: [product]
    } = await pool.query(
      'UPDATE products SET name = $1, image = $2, description = $3, category = $4, price = $5, stock = $6 WHERE id = $7 RETURNING *;',
      [name, image, description, category, price, stock, id]
    );

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
};

export { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct };
