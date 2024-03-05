import { Card, CardContent, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect } from "react";
import { useExpenses } from "../hooks/ExpenseContext";
import { useBudgets } from "../hooks/BudgetContext";
import currencyFormatter from "../utils/currencyFormatter";
import { useDate } from "../hooks/DateContext";
import { useSavings } from "../hooks/SavingsContext";

export const SavingsLineChart = () => {

    const { filteredExpenses, expensesList, calculateExpensesPerMonth, calculateAvgExpenses } = useExpenses();
    const { budgets, getMonthlyBudgetAmountsList } = useBudgets();
    const { date, year } = useDate();
    const { savingsList, getSavingsList } = useSavings();

    useEffect(() => {
        calculateExpensesPerMonth();
        getMonthlyBudgetAmountsList();
        getSavingsList();
        calculateAvgExpenses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredExpenses, budgets, date])

    const xLabels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    return (
        <Stack direction={"row"} gap={2}>
            <Card
                sx={{
                    height: '30vh',
                    boxShadow: 0,
                    backgroundColor: '#F4F4F2',
                    borderRadius: '2em',
                }}
            >
                <CardContent sx={{
                    height: '100%',
                    width: '50vh'
                }}>
                    <Typography position={'relative'} top={10} padding={2} variant="h8" fontWeight={400} color="#00000040">
                        Savings {year}
                    </Typography>
                    <LineChart
                        sx={{
                            marginBottom: 3
                        }}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        series={[
                            {
                                label: 'Expenses',
                                color: 'black',
                                data: expensesList,
                                valueFormatter: currencyFormatter
                            },
                            {
                                label: 'Savings',
                                color: '#9cbc81',
                                data: savingsList,
                                valueFormatter: currencyFormatter
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </Stack>
    );
}