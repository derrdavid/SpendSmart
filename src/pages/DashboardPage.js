import React, { useEffect, useState } from 'react';
import { Card, CardContent, Container, Divider, Stack } from '@mui/material';
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
import { DateProvider, useDate } from '../hooks/DateContext';

export default function DashboardPage() {
    return (
        <DateProvider>
            <ExpenseProvider>
                <CategoryProvider>
                    <BudgetProvider>
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
                                <MonthSelection />
                                <Divider orientation="horizontal" flexItem />
                                <ExpensesList style={{ flex: '1' }} />
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                                <Stack direction='row' spacing={2}>
                                    <BudgetCard></BudgetCard>
                                    <BalanceCards></BalanceCards>
                                </Stack>
                                <ExpensesBarChart />
                                <Stack direction='row' spacing={2}>
                                    <SavingsLineChart></SavingsLineChart>
                                    <Stack direction='column' spacing={2}>
                                        <Card>
                                            <CardContent>
                                                <h1>avg</h1>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent>
                                                <h1>total</h1>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Container>
                    </BudgetProvider>
                </CategoryProvider>
            </ExpenseProvider >
        </DateProvider>
    );

}