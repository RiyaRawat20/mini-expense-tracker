import { useState } from "react";
import { addExpense, updateExpense } from "../services/api";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];

function ExpenseForm({ onSave, editingExpense, setEditingExpense }) {
  const [form, setForm] = useState(
    editingExpense || { amount: "", category: "", date: "", note: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) {
      setError("Amount, category and date are required");
      return;
    }
    if (Number(form.amount) <= 0) {
      setError("Amount must be positive");
      return;
    }
    if (form.date > new Date().toISOString().split("T")[0]) {
      setError("Date cannot be in the future");
      return;
    }
    setError("");
    if (editingExpense) {
      await updateExpense(editingExpense.id, form);
      setEditingExpense(null);
    } else {
      await addExpense(form);
    }
    setForm({ amount: "", category: "", date: "", note: "" });
    onSave();
  };

  return (
    <div className="form-container">
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handleChange}
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
        />
        <button type="submit">
          {editingExpense ? "Update" : "Add Expense"}
        </button>
        {editingExpense && (
          <button type="button" onClick={() => setEditingExpense(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ExpenseForm;