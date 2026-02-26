const pool = require('../config/database');

exports.getAllClassifieds = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM classifieds WHERE expires_at > NOW() OR expires_at IS NULL ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClassified = async (req, res) => {
  try {
    const { title, description, category, contact_info, price, image, expires_at } = req.body;
    const result = await pool.query(
      'INSERT INTO classifieds (title, description, category, contact_info, price, image, expires_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, category, contact_info, price, image, expires_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClassified = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, contact_info, price, image, expires_at } = req.body;
    const result = await pool.query(
      'UPDATE classifieds SET title = $1, description = $2, category = $3, contact_info = $4, price = $5, image = $6, expires_at = $7 WHERE id = $8 RETURNING *',
      [title, description, category, contact_info, price, image, expires_at, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Classified not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClassified = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM classifieds WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Classified not found' });
    }
    res.json({ message: 'Classified deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
