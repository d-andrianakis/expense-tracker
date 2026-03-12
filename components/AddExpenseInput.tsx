import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
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
        <>
        <h2 className="pt-5">Select Category</h2>
        <form onSubmit={handleExpenseSubmit}>
            <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full" style={{ color: 'black' }}>
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
            <Button type="submit">Add</Button>
        </form>
        </>
    )
}
