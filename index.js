const express = require('express');
const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
});
