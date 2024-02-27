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
                    maxHeight: '80vh',
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
                    <Stack direction='column' spacing={4} divider={<Divider orientation="horizontal" flexItem />}>
                        <BalanceSheet />
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack direction='column' spacing={4} divider={<Divider orientation="horizontal" flexItem />}>
                        <SavingsChart />
                        <SavingsLineChart />
                    </Stack>
                </div>
            </CategoryProvider>
        </ExpenseProvider>
    );

}