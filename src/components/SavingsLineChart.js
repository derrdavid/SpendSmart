import { Card, CardContent, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useExpenses } from "../hooks/ExpenseContext";
import { useBudgets } from "../hooks/BudgetContext";
import currencyFormatter from "../utils/currencyFormatter";
import { useDate } from "../hooks/DateContext";
import { TotalCards } from "./Cards/TotalCards";

export const SavingsLineChart = () => {

    const { filteredExpenses, calculateSumsPerMonth } = useExpenses();
    const { budgets, getAmounts } = useBudgets();
    const { date, year } = useDate();

    const [expenseList, setExpenseList] = useState(new Array(12).fill(0));
    const [savingsList, setSavingsList] = useState(new Array(12).fill(0));

    const [totalSavings, setTotalSavings] = useState(0);
    const [avgExpenses, setAvgExpenses] = useState(0);
    let budgetList = [];

    useEffect(() => {
        setExpenseList(calculateSumsPerMonth());
        budgetList = getAmounts();
        calcSavingsList();
        calcAvgExpenses();
    }, [filteredExpenses, budgets, date])

    const calcSavingsList = () => {
        let tempTotal = 0;
        let savings = new Array(12).fill(0);
        for (let i = 0; i < budgetList.length; i++) {
            savings[i] = budgetList[i] - expenseList[i];
            tempTotal += savings[i];
        }
        setTotalSavings(tempTotal);
        setSavingsList(savings);
    }

    const calcAvgExpenses = () => {
        let avg = 0;
        expenseList.forEach((item) => {
            avg += item;
        });
        avg /= expenseList.length;
        setAvgExpenses(avg);
    };

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
                                data: expenseList,
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
            <TotalCards savings={totalSavings} avg={avgExpenses}></TotalCards>
        </Stack>
    );
}