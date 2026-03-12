import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddCategoryInput ({ onAdd }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      onAdd(value);
      setValue("");
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="New category"
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}