function SummaryPanel({ expenses }) {
  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const total = thisMonth.reduce((sum, e) => sum + Number(e.amount), 0);

  const perCategory = thisMonth.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const highest = thisMonth.reduce((max, e) => 
    Number(e.amount) > Number(max.amount || 0) ? e : max, {});

  return (
    <div className="summary-panel">
      <h2>Summary — {now.toLocaleString("en-IN", { month: "long", year: "numeric" })}</h2>
      <div className="summary-cards">
        <div className="summary-card total">
          <span>Total Spent</span>
          <h3>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="summary-card highest">
          <span>Highest Expense</span>
          <h3>₹{Number(highest.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h3>
          <small>{highest.category || "-"}</small>
        </div>
      </div>
      <div className="category-breakdown">
        <h3>By Category</h3>
        {Object.entries(perCategory).map(([cat, amt]) => (
          <div key={cat} className="category-row">
            <span className={`badge ${cat.toLowerCase()}`}>{cat}</span>
            <span>₹{amt.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
        ))}
        {Object.keys(perCategory).length === 0 && (
          <p className="empty-state">No expenses this month</p>
        )}
      </div>
    </div>
  );
}

export default SummaryPanel;