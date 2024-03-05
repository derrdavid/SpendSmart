import { Container, Divider, Stack } from '@mui/material';
import ExpensesList from '../components/ExpensesList';
import BudgetCard from '../components/Cards/BudgetCard';
import MonthSelection from '../components/MonthSelection';
import { ExpensesBarChart } from '../components/ExpensesBarChart';
import { SavingsLineChart } from '../components/SavingsLineChart';
import { CurrencyCard } from '../components/Cards/CurrencyCard';
import { BalanceCard } from '../components/Cards/BalanceCard';
import { useEffect, useState } from 'react';
import { useDate } from '../hooks/DateContext';
import { useExpenses } from '../hooks/ExpenseContext';
import { useBudgets } from '../hooks/BudgetContext';
import { useSavings } from '../hooks/SavingsContext';

export default function DashboardPage() {

    const { month } = useDate();
    const { calculateMonthlyTotalSum, filteredExpenses, avgExpenses } = useExpenses();
    const { budgets } = useBudgets();
    const { totalSavings } = useSavings();

    const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);

    useEffect(() => {
        const totalExpenses = calculateMonthlyTotalSum();
        setTotalMonthlyExpenses(totalExpenses);
        const monthBudget = budgets[month];
        if (monthBudget) {
            setMonthlySavings(monthBudget.amount - totalExpenses);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredExpenses, budgets]);

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
                <MonthSelection />
                <Divider orientation="horizontal" flexItem />
                <ExpensesList style={{ flex: '1' }} />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction='column' spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                <Stack direction='row' spacing={2}>
                    <BudgetCard></BudgetCard>
                    <Stack direction={'row'} spacing={2}>
                        <CurrencyCard title={"Expenses"} value={totalMonthlyExpenses}></CurrencyCard>
                        <BalanceCard title={"Balance"} balance={monthlySavings} />
                    </Stack >
                </Stack>
                <ExpensesBarChart />
                <Stack direction='row' spacing={2}>
                    <SavingsLineChart></SavingsLineChart>
                    <Stack direction='column' spacing={2} height={'40vh'}>
                        <BalanceCard title={"Total Savings"} balance={totalSavings} />
                        <CurrencyCard title={"Avg.Monthly Expenses"} value={avgExpenses} />
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );

}