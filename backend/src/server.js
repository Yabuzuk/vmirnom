const express = require('express');
const cors = require('cors');
require('dotenv').config();

const newsRoutes = require('./routes/news');
const eventsRoutes = require('./routes/events');
const classifiedsRoutes = require('./routes/classifieds');
const uploadRoutes = require('./routes/upload');
const businessLocationsRoutes = require('./routes/businessLocations');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ message: 'API работает' });
});

app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/classifieds', classifiedsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/business-locations', businessLocationsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
