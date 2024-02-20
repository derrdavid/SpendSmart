import React, { useState } from 'react';
import { Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ExpensesList from '../components/ExpensesList';
import BalanceSheet from '../components/BalanceSheet';
import MonthSelection from '../components/MonthSelection';
import { ExpenseProvider } from '../hooks/ExpenseContext';

export default function MonthlyPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <ExpenseProvider>
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
                    <div>
                        <h1>PieChart</h1>
                    </div>
                    <div>
                        <h1>BarChart</h1>
                    </div>
                </Stack>
            </div>
        </ExpenseProvider>
    );
}