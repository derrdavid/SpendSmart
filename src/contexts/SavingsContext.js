import { createContext, useContext, useState } from "react";
import { useExpenses } from "./ExpenseContext";
import { useBudgets } from "./BudgetContext";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
    const { expensesList } = useExpenses();
    const { budgetList } = useBudgets();

    const [monthlySavings, setMonthlySavings] = useState(new Array(12).fill(0));

    const calculateSavings = () => {
        let savings = new Array(12).fill(0);
        for (let i = 0; i < budgetList.length; i++) {
            savings[i] = budgetList[i] - expensesList[i];
        }
        setMonthlySavings(savings);
    }

    const getTotalSavings = () => {
        let total = 0;
        monthlySavings.forEach((item) => {
            total += item;
        })
        return total;
    }

    return (
        <SavingsContext.Provider value={{
            monthlySavings, calculateSavings, getTotalSavings
        }}>
            {children}
        </SavingsContext.Provider>
    );
}

export const useSavings = () => useContext(SavingsContext);