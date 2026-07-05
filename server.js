require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const contactRoutes = require('./server/routes/contact.routes.js');
const projectRoutes = require('./server/routes/project.routes.js');
const qualificationRoutes = require('./server/routes/qualification.routes.js');
const userRoutes = require('./server/routes/user.routes.js');
const authRoutes = require('./server/routes/auth.routes.js');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:5173',
    // Vercel 배포 후 여기에 추가
    // 'https://your-project.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
  res.send('Hello API');
});

app.get('/health', (req, res) => {
  res.send('ok');
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error Handler
app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: `${err.name}: ${err.message}`,
    });
  }

  if (err) {
    console.error(err);
    return res.status(400).json({
      error: `${err.name}: ${err.message}`,
    });
  }

  next();
});

// MongoDB & Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });