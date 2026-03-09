import { ThemeProvider } from "../components/theme-provider"
import { ModeToggle } from "../components/mode-toggle"
import { useState } from "react"
import AddCategoryInput from "./AddCategoryInput"
import CategorySelect from "./CategorySelect"
import './App.css'

function App() {
  const [categories, setCategories] = useState(["Food", "Travel", "Fun"])

  const addCategory = (newCategory) => {
    if (!newCategory.trim()) return;

    setCategories((prev) => [...prev, newCategory])
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <ModeToggle />
        <h1>Expense tracker</h1>

        <AddCategoryInput onAdd={addCategory} />

        <h2>Select Category</h2>

        <CategorySelect categories={categories} />
      </div>
    </ThemeProvider>
  )
}

export default App
