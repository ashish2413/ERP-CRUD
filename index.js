// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const db = require('./models/database'); // Database connection

// Create an instance of the express app
const app = express();

// Import route files
const adminRoutes = require('./Routes/adminRoutes');
const salesmanagerRoutes = require('./Routes/salesmanagerRoutes');
const hrRoutes = require('./Routes/hrRoutes');
const labourRoutes = require('./Routes/labourRoutes');

app.use(express.json());

app.use('/sales-manager', salesmanagerRoutes);

app.use('/labour', labourRoutes);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
