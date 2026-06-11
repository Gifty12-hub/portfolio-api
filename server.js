const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', require('./routes/users'));
app.use('/skills', require('./routes/skills'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB

 mongoose.connect(process.env.MONGODB_URI)
   .then(() => {
     app.get('/', (req, res) => {
       res.send('Welcome to the Portfolio Builder API');
     });
    console.log('Connected to MongoDB');
     
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
   });
 })
  .catch((err) => {
     console.error('MongoDB connection error:', err);
  });