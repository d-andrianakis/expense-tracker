import { useState } from "react";

export default function AddCategoryInput ({ onAdd }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      onAdd(value);
      setValue("");
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New category"
      />
      <button type="submit">Add</button>
    </form>
  );
}