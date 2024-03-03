import { Card, CardContent, Stack, Typography } from "@mui/material";
import currencyFormatter from "../../utils/currencyFormatter";

export function CurrencyCard({ title, value }) {
    return (
        <Card sx={{
            width: 125,
            height: 100,
            padding: 1,
            boxShadow: 0,
            backgroundColor: '#F4F4F2',
            borderRadius: '2em',
        }}>
            <CardContent>
                <Stack orientation="column" spacing={'0.5vh'}>
                    <Typography variant="h8" fontWeight={400} color="#00000040">
                        {title}
                    </Typography>
                    <Typography fontSize={20} fontWeight={600}>
                        {currencyFormatter(value)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card >
    );
}