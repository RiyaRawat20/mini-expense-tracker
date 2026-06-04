import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  Food: "#10b981",
  Transport: "#3b82f6",
  Bills: "#ef4444",
  Entertainment: "#f59e0b",
  Other: "#8b5cf6",
};

function ExpenseChart({ expenses }) {
  const data = expenses.reduce((acc, e) => {
    const existing = acc.find((i) => i.name === e.category);
    if (existing) existing.value += Number(e.amount);
    else acc.push({ name: e.category, value: Number(e.amount) });
    return acc;
  }, []);

  if (data.length === 0) {
    return <p className="empty-state">No data for chart yet</p>;
  }

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#6b7280"} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `₹${val.toLocaleString("en-IN")}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;