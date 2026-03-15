import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function AddCategoryInput ({ onAdd }: { onAdd: (category: string) => void }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onAdd(value);
      setValue("");
    };

  return (
    <div className="flex pb-2 justify-center">
      <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" style={{color: 'black'}} className="w-full">Add Category</Button>
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