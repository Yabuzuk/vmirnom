const pool = require('../config/database');

exports.getAllBusinessLocations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM business_locations WHERE is_active = TRUE ORDER BY plan_type DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM business_locations WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Business location not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBusinessLocation = async (req, res) => {
  try {
    const { name, description, category, address, latitude, longitude, phone, website, email, working_hours, images, plan_type } = req.body;
    const result = await pool.query(
      'INSERT INTO business_locations (name, description, category, address, latitude, longitude, phone, website, email, working_hours, images, plan_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [name, description, category, address, latitude, longitude, phone, website, email, working_hours, images, plan_type || 'free']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBusinessLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, address, latitude, longitude, phone, website, email, working_hours, images, plan_type, is_active } = req.body;
    const result = await pool.query(
      'UPDATE business_locations SET name = $1, description = $2, category = $3, address = $4, latitude = $5, longitude = $6, phone = $7, website = $8, email = $9, working_hours = $10, images = $11, plan_type = $12, is_active = $13 WHERE id = $14 RETURNING *',
      [name, description, category, address, latitude, longitude, phone, website, email, working_hours, images, plan_type, is_active, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Business location not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBusinessLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM business_locations WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Business location not found' });
    }
    res.json({ message: 'Business location deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
