import React, { useState } from 'react';
import { Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ExpensesList from '../components/ExpensesList';
import BalanceSheet from '../components/BalanceSheet';
import MonthSelection from '../components/MonthSelection';
import { ExpenseProvider } from '../hooks/ExpenseContext';
import { CategoryProvider } from '../hooks/CategoryContext';
import { SavingsChart } from '../components/SavingsChart';
import { SavingsLineChart } from '../components/SavingsLineChart';

export default function DashboardPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <ExpenseProvider>
            <CategoryProvider>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '5em'
                }}>
                    <ExpensesList date={date} />
                    <Divider orientation="vertical" flexItem />
                    <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        <MonthSelection date={date} setDate={setDate} />
                        <BalanceSheet />
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        <SavingsChart></SavingsChart>
                        <SavingsLineChart></SavingsLineChart>
                    </Stack>
                </div>
            </CategoryProvider>
        </ExpenseProvider>
    );
}