const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const products = [
  { id: 1, name: 'Advil', price: 10 },
  { id: 2, name: 'Bioflu', price: 10 },
  { id: 2, name: 'Biogesic', price: 5 },
  { id: 2, name: 'Bonamine', price: 20 },
  { id: 2, name: 'Calcium Cee', price: 15 },
  { id: 2, name: 'Calvit', price: 10 },
  { id: 2, name: 'Cetirizine', price: 15 },
  { id: 1, name: 'Cherifer', price: 10 },
  { id: 2, name: 'Folicard', price: 20 },
  { id: 2, name: 'Gaviscon', price: 10 },
  { id: 2, name: 'Kremil-S', price: 20 },
  { id: 2, name: 'Medicol', price: 20 },
  { id: 2, name: 'Moriamin', price: 10 },
  { id: 2, name: 'Potencee', price: 15 },
  { id: 2, name: 'Salonpas', price: 15 },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/purchase', (req, res) => {
  // Handle purchase logic here
  // You can simulate a database update or payment process
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
