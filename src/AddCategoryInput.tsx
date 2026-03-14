import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function AddCategoryInput ({ onAdd }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      onAdd(value);
      setValue("");
    };

  return (
    <div className="w-1/2 flex pt-7 justify-center">
      <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{color: 'black'}}>Add Category</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Add Category</PopoverTitle>
        </PopoverHeader>
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
      </PopoverContent>
    </Popover>
    </div>
  );
}