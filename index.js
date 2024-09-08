const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Desktop API
app.get('/api/greet', (req, res) => {
  res.json({ message: "Hello from the desktop API!" });
});

// Mobile API
app.get('/api/mobile-greet', (req, res) => {
  res.json({ message: "Hello from the mobile API!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BFF is running on http://localhost:${PORT}`);
});
