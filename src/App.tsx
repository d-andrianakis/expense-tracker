import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./layout.tsx"
import { useState } from "react"
import AddCategoryInput from "./AddCategoryInput"
import AddExpenseInput from "@/components/AddExpenseInput"
import DisplayExpenses from "@/components/DisplayExpenses"
import './App.css'

type Expense = { amount: string; category: string };

function App() {
  const [categories, setCategories] = useState(["Food", "Travel", "Fun"])
  const [expenses, setExpenses] = useState<Expense[]>([])

  const addCategory = (newCategory) => {
    if (!newCategory.trim()) return;

    setCategories((prev) => [...prev, newCategory])
  }

  const addExpense = (newExpense: Expense) => {
    if (!newExpense.amount.trim()) return;
    setExpenses((prev) => [...prev, newExpense]);
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <AddCategoryInput onAdd={addCategory} />
        <AddExpenseInput onAddExpense={addExpense} categories={categories}/>
        <DisplayExpenses expenses={expenses} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
