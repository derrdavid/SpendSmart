import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useExpenses } from "../../hooks/ExpenseContext";
import { useBudgets } from "../../hooks/BudgetContext";
import { useDate } from "../../hooks/DateContext";
import currencyFormatter from "../../utils/currencyFormatter";

export function TotalCards({ savings, avg }) {
    const { filteredExpenses, calculateSumsPerMonth } = useExpenses();
    const { budgets, getAmounts } = useBudgets();
    const { date, year } = useDate();

    return (
        <Stack direction='column' spacing={2} height={'40vh'}>
            <Card sx={{
                width: '15vh',
                padding: 1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Typography variant="h8" fontWeight={400} color="#00000040">
                        Total Savings
                    </Typography>
                    <Typography fontSize={20} fontWeight={600}>
                        {currencyFormatter(savings)}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{
                width: '15vh',
                padding: 1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Typography variant="h8" fontWeight={400} color="#00000040">
                        Avg. Monthly Expenses
                    </Typography>
                    <Typography fontSize={20} fontWeight={600}>
                        {currencyFormatter(avg)}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}