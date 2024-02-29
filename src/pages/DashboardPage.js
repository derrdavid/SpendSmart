import React, { useState } from 'react';
import { Card, Container, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ExpensesList from '../components/ExpensesList';
import BudgetCard from '../components/Cards/BudgetCard';
import MonthSelection from '../components/MonthSelection';
import { ExpenseProvider } from '../hooks/ExpenseContext';
import { CategoryProvider } from '../hooks/CategoryContext';
import { ExpensesBarChart } from '../components/ExpensesBarChart';
import { SavingsLineChart } from '../components/SavingsLineChart';
import BalanceCard from '../components/Cards/BalanceCard';

export default function DashboardPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <ExpenseProvider>
            <CategoryProvider>
                <Container style={{
                    maxHeight: '80vh',
                    width: '100vh',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    display: 'flex',
                    justifyContent: 'space-around',
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
                            <BalanceCard></BalanceCard>
                        </Stack>
                        <ExpensesBarChart date={date}/>
                        <SavingsLineChart></SavingsLineChart>
                    </Stack>
                </Container>
            </CategoryProvider>
        </ExpenseProvider >
    );

}