import { useState, useEffect } from "react";
import { getExpenses } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import ExpenseChart from "./components/ExpenseChart";
import FilterBar from "./components/FilterBar";

function filterExpenses(expenses, filters) {
  const now = new Date();
  return expenses.filter((e) => {
    const matchCategory = filters.category === "All" || e.category === filters.category;
    const expDate = new Date(e.date);
    let matchDate = true;

    if (filters.dateRange === "thisMonth") {
      matchDate = expDate.getMonth() === now.getMonth() && 
                  expDate.getFullYear() === now.getFullYear();
    } else if (filters.dateRange === "lastMonth") {
      const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      matchDate = expDate.getMonth() === last.getMonth() && 
                  expDate.getFullYear() === last.getFullYear();
    } else if (filters.dateRange === "byMonth" && filters.month !== "" && filters.year) {
      matchDate = expDate.getMonth() === Number(filters.month) && 
                  expDate.getFullYear() === Number(filters.year);
    } else if (filters.dateRange === "custom" && filters.startDate && filters.endDate) {
      matchDate = e.date >= filters.startDate && e.date <= filters.endDate;
    }

    return matchCategory && matchDate;
  });
}

function exportCSV(expenses) {
  const header = "Date,Category,Amount,Note";
  const rows = expenses.map((e) => `${e.date},${e.category},${e.amount},${e.note || ""}`);
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: "All",
    dateRange: "all",
    startDate: "",
    endDate: "",
    month: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    const res = await getExpenses();
    setExpenses(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filtered = filterExpenses(expenses, filters);

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Mini Expense Tracker</h1>
        <p>Track your daily spending smartly</p>
      </header>

      <div className="main-layout">
        <div className="left-panel">
          <SummaryPanel expenses={expenses} />
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="right-panel">
          <ExpenseForm
            onSave={fetchExpenses}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />

          <div className="list-header">
            <h2>All Expenses</h2>
            <button onClick={() => exportCSV(filtered)} className="export-btn">
              ⬇ Export CSV
            </button>
          </div>

          <FilterBar filters={filters} setFilters={setFilters} />

          {loading ? (
            <p className="loading">Loading expenses...</p>
          ) : (
            <ExpenseList
              expenses={filtered}
              onDelete={fetchExpenses}
              onEdit={setEditingExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;