import React, { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Typography, TextField, Input } from '@mui/material';
import monthToString from '../utils/dateFormatter';
import currencyFormatter from '../utils/currencyFormatter';

export default function BudgetCard(date) {
    const [editable, setEditable] = useState(false);
    const [hover, setHover] = useState(false);
    const [budget, setBudget] = useState(0);

    useEffect(() => {

    }, [])

    const handleCardClick = () => {
        setEditable(true);
    };

    const handleInputChange = (e) => {
        setBudget(e.target.value);
    };

    const handleInputBlur = () => {
        setEditable(false);
    };

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') { setEditable(false) }
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
                <Stack orientation="column" spacing={1}>
                    <Typography variant="h8" fontWeight={400} color="#00000040">
                        Budget {monthToString(date)}
                    </Typography>
                    {editable ? (
                        <Input
                            type='number'
                            sx={{
                                border: 0,
                                fontSize: 40,
                                variant: "h4",
                                fontWeight: 600
                            }}
                            value={budget}
                            onChange={handleInputChange}
                            onKeyUp={handlePressEnter}
                            onBlur={handleInputBlur}
                            autoFocus
                        />
                    ) : (
                        <Typography fontSize={40} fontWeight={600}>
                            {currencyFormatter(budget)}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>

    );
}
