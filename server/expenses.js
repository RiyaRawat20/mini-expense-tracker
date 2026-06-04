const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'expenses.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

function readExpenses() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeExpenses(expenses) {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

module.exports = { readExpenses, writeExpenses };