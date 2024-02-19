import React, { useState } from 'react';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import ExpensesList from '../components/ExpensesList';
import BalanceSheet from '../components/BalanceSheet';
import MonthSelection from '../components/MonthSelection';

export default function MonthlyPage() {
    const [date, setDate] = useState(dayjs());

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-around',
            margin: '5em'
        }}>

            <ExpensesList date={date} />

            <Stack direction='column' spacing={2}>
                <MonthSelection date={date} setDate={setDate}/>
                <BalanceSheet/>
            </Stack>
            <div>

            </div>
        </div>
    );
}