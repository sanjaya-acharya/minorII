const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');

app.use(express.json())
// Enable CORS
app.use(cors());

const port = process.env.PORT || 4000

const accRoutes = require('./routes/accounts')
const menuRoutes = require('./routes/menu')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.log('Error occurred while connecting to MongoDB:', err);
  }
);

app.use('/api/account', accRoutes)
app.use('/api/menu', menuRoutes)


app.listen(port, () => {
    console.log(`Listening at port ${port}:`)
})

