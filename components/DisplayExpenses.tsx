export default function DisplayExpenses({ expenses }) {
  return (
    <select>
      {expenses.map((cat, index) => (
        <option key={index} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}