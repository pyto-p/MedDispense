const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const products = [
  { 
    id: 1, 
    name: 'Advil', 
    price: 10,  
    stock: 100,
    imageSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rosepharmacy.com%2Fph1%2Fwp-content%2Fuploads%2F2016%2F10%2F62550.png&f=1&nofb=1&ipt=1bb046188e25f81361e5d129a185d2a3a9b18fce6e54fe6a246c4a7215624af1&ipo=images'
    
  },
  { 
    id: 2, 
    name: 'Bioflu', 
    price: 10, 
    stock: 100,
    imageSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rosepharmacy.com%2Fph1%2Fwp-content%2Fuploads%2F2016%2F09%2F37219.png&f=1&nofb=1&ipt=6821964f8e96fd634e95e19b147327d306bf19a0598235db295ecc2c6e23e1b9&ipo=images'
  },
  { 
    id: 3, 
    name: 'Biogesic', 
    price: 5, 
    stock: 100,
    imageSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rosepharmacy.com%2Fph1%2Fwp-content%2Fuploads%2F2016%2F09%2F29773-2.png&f=1&nofb=1&ipt=c242ab4725438d2bf11365f48cfc42c3a374b78e19a4c6ef9eb304d9142d261c&ipo=images'
  },
  { 
    id: 4, 
    name: 'Bonamine', 
    price: 20, 
    stock: 100,
  },
  { 
    id: 2, 
    name: 'Calcium Cee', 
    price: 15, 
    stock: 100,
  },
  // { id: 2, name: 'Calvit', price: 10 },
  // { id: 2, name: 'Cetirizine', price: 15 },
  // { id: 1, name: 'Cherifer', price: 10 },
  // { id: 2, name: 'Folicard', price: 20 },
  // { id: 2, name: 'Gaviscon', price: 10 },
  // { id: 2, name: 'Kremil-S', price: 20 },
  // { id: 2, name: 'Medicol', price: 20 },
  // { id: 2, name: 'Moriamin', price: 10 },
  // { id: 2, name: 'Potencee', price: 15 },
  // { id: 2, name: 'Salonpas', price: 15 },
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
