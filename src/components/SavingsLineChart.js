import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useExpenses } from "../hooks/ExpenseContext";
import { useBudgets } from "../hooks/BudgetContext";
import currencyFormatter from "../utils/currencyFormatter";
import { useDate } from "../hooks/DateContext";

export const SavingsLineChart = () => {

    const { filteredExpenses, calculateSumsPerMonth } = useExpenses();
    const { budgets, getAmounts } = useBudgets();
    const { date, year, month } = useDate();

    const [expenseList, setExpenseList] = useState(new Array(12).fill(0));
    const [budgetList, setBudgetList] = useState(new Array(12).fill(0));
    const [savingsList, setSavingsList] = useState(new Array(12).fill(0));

    useEffect(() => {
        setExpenseList(calculateSumsPerMonth());
        setBudgetList(getAmounts());
        setSavingsList(calcSavings());
    }, [filteredExpenses, budgets, date])

    const calcSavings = () => {
        let savings = new Array(12).fill(0);
        for (let i = 0; i < budgetList.length; i++) {
            savings[i] = budgetList[i] - expenseList[i];
        }
        return savings;
    }

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
        <Card
            sx={{
                height: '30vh',
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}
        >
            <CardContent sx={{
                height: '30vh',
                width: '50vh'
            }}>
                <Typography position={'relative'} top={10} padding={2} variant="h8" fontWeight={400} color="#00000040">
                    Savings {year}
                </Typography>
                <LineChart
                    sx={{
                        margin: 1
                    }}
                    xAxis={[{ id: 0, data: xLabels, scaleType: 'band' }]}
                    series={[
                        {
                            label: 'Expenses',
                            color: 'black',
                            data: expenseList,
                            valueFormatter: currencyFormatter
                        },
                        {
                            label: 'Budget',
                            color: '#819cbc',
                            data: budgetList,
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
    );
}