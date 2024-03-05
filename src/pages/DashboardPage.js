import { Container, Divider, Stack } from '@mui/material';
import ExpensesList from '../components/ExpenseControls/ExpensesList';
import BudgetCard from '../components/Cards/BudgetCard';
import MonthSelection from '../components/ExpenseControls/MonthSelection';
import { ExpensesBarChart } from '../components/Charts/ExpensesBarChart';
import { SavingsLineChart } from '../components/Charts/SavingsLineChart';
import { CurrencyCard } from '../components/Cards/CurrencyCard';
import { BalanceCard } from '../components/Cards/BalanceCard';
import { useEffect, useState } from 'react';
import { useDate } from '../contexts/DateContext';
import { useExpenses } from '../contexts/ExpenseContext';
import { useBudgets } from '../contexts/BudgetContext';
import { useSavings } from '../contexts/SavingsContext';
import { useCategories } from '../contexts/CategoryContext';

export default function DashboardPage() {

    const { month, year, date, setDate } = useDate();
    const { monthlyExpenses, expensesFetched, filterExpensesByMonth, fetchExpensesByYear, expenses, avgExpenses, expensesList, calculateExpensesPerMonth } = useExpenses();
    const { budgetList, budgetsFetched, fetchBudgetsByYear, budgets, calculateBudgetsPerMonth } = useBudgets();
    const { categories } = useCategories();
    const { monthlySavings, calculateSavings, getTotalSavings } = useSavings();


    useEffect(() => {
        fetchBudgetsByYear(year);
        fetchExpensesByYear(year);
    }, [year]);

    useEffect(() => {
        if (expensesFetched && budgetsFetched) {
            filterExpensesByMonth(month);
            calculateBudgetsPerMonth();
        }
    }, [month, expenses, budgets]);

    useEffect(() => {
        calculateSavings();
    }, [monthlyExpenses, budgetList]);

    return (

        <Container style={{
            maxHeight: '80vh',
            width: '100vh',
            justifyContent: 'space-around',
            display: 'flex',
            alignItems: 'flex-start',
            margin: '5em',
            gap: '2em',
        }}>
            <Stack spacing={2}>
                <MonthSelection date={date} setDate={setDate} />
                <Divider orientation="horizontal" flexItem />
                <ExpensesList style={{ flex: '1' }} />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                <Stack direction='row' spacing={2}>
                    <BudgetCard date={date}></BudgetCard>
                    <Stack direction={'row'} spacing={2}>
                        <CurrencyCard title={"Expenses"} value={expensesList[month]}></CurrencyCard>
                        <BalanceCard title={"Balance"} balance={monthlySavings[month]} />
                    </Stack >
                </Stack>
                <ExpensesBarChart expenses={expenses} categories={categories} year={year} />
                <Stack direction='row' spacing={2}>
                    <SavingsLineChart expensesList={expensesList} savingsList={monthlySavings} year={year}
                    ></SavingsLineChart>
                    <Stack direction='column' spacing={2} height={'40vh'}>
                        <BalanceCard title={"Total Savings"} balance={getTotalSavings()} />
                        <CurrencyCard title={"Avg.Monthly Expenses"} value={avgExpenses} />
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );

}