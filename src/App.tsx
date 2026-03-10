import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import AddCategoryInput from "./AddCategoryInput"
import CategorySelect from "./CategorySelect"
import AddExpenseInput from "@/components/AddExpenseInput"
import DisplayExpenses from "@/components/DisplayExpenses"
import './App.css'

function App() {
  const [categories, setCategories] = useState(["Food", "Travel", "Fun"])
  const [expenses, setExpenses] = useState([12,15,20])

  const addCategory = (newCategory) => {
    if (!newCategory.trim()) return;

    setCategories((prev) => [...prev, newCategory])
  }

  const addExpense = (newExpense) => {
    if (!newExpense.trim()) return;

    setExpenses((prev) => [...prev, newExpense])
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <ModeToggle />
        <h1>Expense tracker</h1>

        <AddCategoryInput onAdd={addCategory} />

        <h2>Select Category</h2>

        <CategorySelect categories={categories} />
        <AddExpenseInput onAddExpense={addExpense} />
        <DisplayExpenses expenses={expenses} />
      </div>
    </ThemeProvider>
  )
}

export default App
