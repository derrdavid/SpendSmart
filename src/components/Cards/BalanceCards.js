import { Stack } from "@mui/material";
import { useExpenses } from "../../hooks/ExpenseContext";
import { useBudgets } from "../../hooks/BudgetContext";
import { useEffect, useState } from "react";
import { useDate } from "../../hooks/DateContext";
import { BalanceCard } from "./BalanceCard";
import { CurrencyCard } from "./CurrencyCard";

export default function BalanceCards() {
    const { month } = useDate();
    const { calculateFilteredTotalSum } = useExpenses();
    const { filteredExpenses } = useExpenses();
    const { budgets } = useBudgets();

    const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);

    useEffect(() => {
        const totalExpenses = calculateFilteredTotalSum();
        setTotalMonthlyExpenses(totalExpenses);
        const monthBudget = budgets[month];
        if (monthBudget) {
            setMonthlySavings(monthBudget.amount - totalExpenses);
        }
    }, [filteredExpenses, budgets]);

    return (
        <Stack direction={'row'} spacing={2}>
            <CurrencyCard title={"Expenses"} value={totalMonthlyExpenses}></CurrencyCard>
            <BalanceCard title={"Balance"} balance={monthlySavings} />
        </Stack >
    );
}