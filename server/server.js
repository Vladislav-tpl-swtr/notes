require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRouter = require('./routes/noteRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Подключаем CORS
app.use(cors({
  origin: 'http://localhost:3000', // Разрешаем фронту доступ
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
}));

// Подключение к MongoDB
connectDB();

// Middleware
app.use(express.json()); 

// Роуты
app.use('/api/notes', noteRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
