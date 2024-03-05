import { createContext, useContext, useState } from "react";
import { useExpenses } from "./ExpenseContext";
import { useBudgets } from "./BudgetContext";

const SavingsContext = createContext();

export function SavingsProvider({ children }) {
    const { expenseList } = useExpenses();
    const { budgetList } = useBudgets();

    const [savingsList, setSavingsList] = useState(new Array(12).fill(0));
    const [totalSavings, setTotalSavings] = useState(0);

    const getSavingsList = () => {
        let tempTotal = 0;
        let savings = new Array(12).fill(0);
        for (let i = 0; i < budgetList.length; i++) {
            console.log(budgetList)
            savings[i] = budgetList[i] - expenseList[i];
            tempTotal += savings[i];
        }
        setTotalSavings(tempTotal);
        setSavingsList(savings);
    }

    return (
        <SavingsContext.Provider value={{
            savingsList, totalSavings, getSavingsList
        }}>
            {children}
        </SavingsContext.Provider>
    );
}

export const useSavings = () => useContext(SavingsContext);