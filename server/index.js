const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});