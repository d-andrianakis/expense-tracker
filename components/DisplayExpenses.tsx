type Expense = { amount: string; category: string };

export default function DisplayExpenses({ expenses }: { expenses: Expense[] }) {
  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.category} — ${expense.amount}
        </li>
      ))}
    </ul>
  );
}