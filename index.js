const express = require('express');
const app = express();
const mongoose = require('mongoose')

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT

const cors = require('cors');

app.use(express.json())
// Enable CORS
app.use(cors());

const accRoutes = require('./routes/accounts')
const itemRoutes = require('./routes/items')
const cartRoutes = require('./routes/cart')
const favRoutes = require('./routes/favorites')
const orderRoutes = require('./routes/orders')
const promotionRoutes = require('./routes/promotions')
const ratingRoutes = require('./routes/ratings')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.log('Error occurred while connecting to MongoDB:', err);
  }
);

app.use('/api/accounts', accRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/favourites', favRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/ratings', ratingRoutes)


app.listen(port, () => {
    console.log(`Listening at port ${port}:`)
})
