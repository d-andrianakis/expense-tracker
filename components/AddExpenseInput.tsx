import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useState } from "react";

type Expense = { amount: string; category: string };

interface AddExpenseInputProps {
  onAddExpense: (expense: Expense) => void;
  categories: string[];
}

export default function AddExpenseInput({ onAddExpense, categories }: AddExpenseInputProps) {
    const [value, setValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleExpenseSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      onAddExpense({ amount: value, category: selectedCategory });
      setValue("");
      setSelectedCategory("");
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">Add Expense</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                <PopoverTitle>Add Expense</PopoverTitle>
                </PopoverHeader>
                <form onSubmit={handleExpenseSubmit}>
                    <div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {categories.map((cat, index) => (
                                    <SelectItem key={index} value={cat}>
                                    {cat}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Field className="pt-3">
                            <FieldLabel htmlFor="input-field-expense">Expense amount</FieldLabel>
                            <Input
                                id="input-field-expense"
                                type="text"
                                placeholder="Expense amount"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Field>
                    </div>
                    <Button variant="secondary" type="submit" className="mt-3 mr-2">Add</Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}
