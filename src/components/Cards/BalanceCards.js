import { Card, CardContent, Stack, Typography } from "@mui/material";
import currencyFormatter from "../../utils/currencyFormatter";
import { useExpenses } from "../../hooks/ExpenseContext";
import { useBudgets } from "../../hooks/BudgetContext";
import { useEffect, useState } from "react";
import { useDate } from "../../hooks/DateContext";

export default function BalanceCards() {
    const { month } = useDate();
    const { calculateFilteredTotalSum } = useExpenses();
    const { filteredExpenses } = useExpenses();
    const { budgets } = useBudgets();

    const [expenses, setExpenses] = useState(0);
    const [savings, setSavings] = useState(0);

    useEffect(() => {
        const totalExpenses = calculateFilteredTotalSum();
        setExpenses(totalExpenses);
        const monthBudget = budgets[month];
        if (monthBudget) {
            setSavings(monthBudget.amount - totalExpenses);
        }
    }, [filteredExpenses, budgets]);

    return (
        <Stack direction={'row'} spacing={2}>
            <Card sx={{
                width: 150,
                height: 100,
                padding: 1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Stack orientation="column" spacing={'0.5vh'}>
                        <Typography variant="h8" fontWeight={400} color="#00000040">
                            Expenses
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>
                            {currencyFormatter(expenses)}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card >
            <Card sx={{
                width: 150,
                height: 100,
                padding: 1,
                boxShadow: 0,
                backgroundColor: savings >= 0 ? '#F0FFF2' : '#FFF0F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Stack orientation="column" spacing={'0.5vh'}>
                        <Typography variant="h8" fontWeight={400} color="#00000040">
                            Balance
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>
                            {currencyFormatter(savings)}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card >
        </Stack >
    );
}