import { deleteExpense } from "../services/api";

function ExpenseList({ expenses, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
      onDelete();
    }
  };

  if (expenses.length === 0) {
    return <p className="empty-state">Looks like your wallet is taking a break! 💸</p>;
  }

  return (
    <div className="list-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.category}</td>
              <td>₹{Number(exp.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
              <td>{exp.note || "-"}</td>
              <td>
                <button onClick={() => onEdit(exp)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(exp.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;