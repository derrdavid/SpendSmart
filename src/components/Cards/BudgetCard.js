import React, { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Typography, Input } from '@mui/material';
import currencyFormatter from '../../utils/currencyFormatter';
import { useBudgets } from '../../contexts/BudgetContext';
import { useDate } from '../../contexts/DateContext';

export default function BudgetCard({ date }) {

    const { budgets, updateBudget, addBudget } = useBudgets();

    const [editable, setEditable] = useState(false);
    const [hover, setHover] = useState(false);
    const [budget, setBudget] = useState({

    });

    useEffect(() => {
        const month = date.month();
        const monthBudget = budgets[month];
        if (monthBudget != null) {
            setBudget({ ...monthBudget });
        } else {
            setBudget({
                amount: 0,
                date: new Date(date.year(), date.month(), 1, 0, 0, 0, 0)
            });
        }
    }, [date, budgets])

    const handleCardClick = () => {
        setEditable(true);
    };

    const handleInputChange = (e) => {
        const input = e.target.value;

        if (/^\d*$/.test(input)) {
            setBudget(prevBudget => ({
                ...prevBudget,
                amount: input
            }));
        }
    };

    const handleInputBlur = async (e) => {
        addOrCreateBudget();
        setEditable(false);
    };

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            addOrCreateBudget();
            setEditable(false);
        }
    }

    const addOrCreateBudget = async () => {
        let newBudget;
        setEditable(false);
        if (budget._id == null) {
            newBudget = await addBudget(budget);
        } else {
            newBudget = await updateBudget(budget);
        }
        setBudget(newBudget);
    }

    return (
        <Card
            sx={{
                cursor: 'pointer',
                width: 300,
                height: 100,
                padding: 1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                border: 1.5,
                borderColor: editable ? '#1976D2' : (hover ? '#000000' : '#bcbcba'),
                borderRadius: 5
            }}
            onClick={handleCardClick}
        >
            <CardContent onMouseOver={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}>
                <Stack orientation="column" spacing={'0.5vh'}>
                    <Typography variant="h8" fontWeight={400} color="#00000040">
                        Budget {date.format('MMMM')}
                    </Typography>
                    {editable ? (
                        <Input
                            sx={{
                                border: 0,
                                fontSize: 40,
                                variant: "h4",
                                fontWeight: 600
                            }}
                            value={budget.amount}
                            onChange={handleInputChange}
                            onKeyUp={handlePressEnter}
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <Typography fontSize={40} fontWeight={600}>
                            {currencyFormatter(budget.amount)}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>

    );
}
