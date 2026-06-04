const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readExpenses, writeExpenses } = require('./expenses');

const router = express.Router();

// GET all expenses
router.get('/', (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// POST new expense
router.post('/', (req, res) => {
  const { amount, category, date, note } = req.body;
  if (!amount || !category || !date) {
    return res.status(400).json({ error: 'Amount, category and date are required' });
  }
  const expenses = readExpenses();
  const newExpense = { id: uuidv4(), amount: Number(amount), category, date, note: note || '' };
  expenses.unshift(newExpense);
  writeExpenses(expenses);
  res.status(201).json(newExpense);
});

// PUT update expense
router.put('/:id', (req, res) => {
  const expenses = readExpenses();
  const index = expenses.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Expense not found' });
  expenses[index] = { ...expenses[index], ...req.body };
  writeExpenses(expenses);
  res.json(expenses[index]);
});

// DELETE expense
router.delete('/:id', (req, res) => {
  let expenses = readExpenses();
  expenses = expenses.filter(e => e.id !== req.params.id);
  writeExpenses(expenses);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;