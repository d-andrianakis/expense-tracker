import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useState } from "react";

export default function AddExpenseInput({ onAddExpense }) {
    const [value, setValue] = useState("");

    const handleExpenseSubmit = (e) => {
      e.preventDefault();

      onAddExpense(value);
      setValue("");
    };
    return (
        <form onSubmit={handleExpenseSubmit}>
            <Field>
                <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
                <Input
                    id="input-field-username"
                    type="text"
                    placeholder="Enter your username"
                />
                <FieldDescription>
                    Choose a unique username for your account.
                </FieldDescription>
            </Field>
        </form>
    )
}
