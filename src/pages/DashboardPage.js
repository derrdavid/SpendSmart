import React, { useState } from 'react';
import { Container, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ExpensesList from '../components/ExpensesList';
import BudgetCard from '../components/Cards/BudgetCard';
import MonthSelection from '../components/MonthSelection';
import { ExpenseProvider } from '../hooks/ExpenseContext';
import { CategoryProvider } from '../hooks/CategoryContext';
import { ExpensesBarChart } from '../components/ExpensesBarChart';
import { SavingsLineChart } from '../components/SavingsLineChart';
import BalanceCards from '../components/Cards/BalanceCards';
import { BudgetProvider } from '../hooks/BudgetContext';

export default function DashboardPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <ExpenseProvider date={date}>
            <CategoryProvider>
                <BudgetProvider date={date}>
                    <Container style={{
                        maxHeight: '80vh',
                        width: '100vh',
                        justifyContent: 'space-around',
                        display: 'flex',
                        alignItems: 'flex-start',
                        margin: '5em',
                        gap: '2em'
                    }}>
                        <Stack spacing={2}>
                            <MonthSelection date={date} setDate={setDate} />
                            <Divider orientation="horizontal" flexItem />
                            <ExpensesList date={date} style={{ flex: '1' }} />
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                            <Stack direction='row' spacing={2}>
                                <BudgetCard date={date}></BudgetCard>
                                <BalanceCards date={date}></BalanceCards>
                            </Stack>
                            <ExpensesBarChart date={date} />
                            <SavingsLineChart></SavingsLineChart>
                        </Stack>
                    </Container>
                </BudgetProvider>
            </CategoryProvider>
        </ExpenseProvider >
    );

}