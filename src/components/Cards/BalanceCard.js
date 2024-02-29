import { Card, CardContent, Stack, Typography } from "@mui/material";
import currencyFormatter from "../../utils/currencyFormatter";
import { useExpenses } from "../../hooks/ExpenseContext";

export default function BalanceCard() {

    const {calculateTotalSum} = useExpenses();

    return (
        <Stack direction={'row'} spacing={2}>
            <Card sx={{
                width: 150,
                height: 100,
                padding:1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Stack orientation="column" spacing={'0.5vh'}>
                        <Typography variant="h8" fontWeight={400} color="#00000040">
                            Expenses
                        </Typography>
                        <Typography fontSize={30} fontWeight={600}>
                            {currencyFormatter(calculateTotalSum())}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card >
            <Card sx={{
                width: 150,
                height: 100,
                padding:1,
                boxShadow: 0,
                backgroundColor: '#F4F4F2',
                borderRadius: '2em',
            }}>
                <CardContent>
                    <Stack orientation="column" spacing={'0.5vh'}>
                        <Typography variant="h8" fontWeight={400} color="#00000040">
                            Savings
                        </Typography>
                        <Typography fontSize={30} fontWeight={600}>
                            {currencyFormatter(100)}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card >
        </Stack >
    );
}