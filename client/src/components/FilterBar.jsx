const CATEGORIES = ["All", "Food", "Transport", "Bills", "Entertainment", "Other"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function FilterBar({ filters, setFilters }) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <div className="filter-bar">
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value, month: "", year: "" })}
      >
        <option value="all">All Time</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="byMonth">By Month</option>
        <option value="custom">Custom Range</option>
      </select>

      {filters.dateRange === "byMonth" && (
        <>
          <select
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          >
            <option value="">Select Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </>
      )}

      {filters.dateRange === "custom" && (
        <>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </>
      )}
    </div>
  );
}

export default FilterBar;