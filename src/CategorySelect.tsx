export default function CategorySelect({ categories }) {
  return (
    <select>
      {categories.map((cat, index) => (
        <option key={index} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}