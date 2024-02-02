const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB, closeDB, getDB } = require('./db');
const { ObjectId } = require('mongodb'); // Add this line to import ObjectId

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB when the server starts
connectDB()
  .then(() => {
    // Define your routes and middleware here

    // Example route to fetch products
    app.get('/products', async (req, res) => {
      try {
        const db = getDB();
        const productsCollection = db.collection('medicine');
        const products = await productsCollection.find({}).toArray();
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Route to handle payment and update stock
    app.post('/payment', async (req, res) => {
      try {
        const { productId, quantity } = req.body;
        await updateStock(productId, quantity);
        res.json({ success: true });
      } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Error starting server:', err));

// Handle Ctrl+C and close MongoDB connection
process.on('SIGINT', () => {
  closeDB().then(() => {
    process.exit(0);
  });
});

// Function to update stock in the database
async function updateStock(productId, quantity) {
  const db = getDB();
  const productsCollection = db.collection('medicine');
  await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $inc: { stock: -quantity } }
  );
}
