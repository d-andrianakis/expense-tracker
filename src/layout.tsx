import { ModeToggle } from "@/components/mode-toggle"
import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Expense tracker</h1>
                <ModeToggle />
            </header>
            <main className="flex flex-1 p-4">
                {children}
            </main>
        </div>
    )
}