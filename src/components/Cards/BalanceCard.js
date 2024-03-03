import { Card, CardContent, Stack, Typography } from "@mui/material";
import currencyFormatter from "../../utils/currencyFormatter";
import { ArrowOutward } from "@mui/icons-material";

export function BalanceCard({ title, balance }) {
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
                    <Stack direction={'row'} gap={1}>
                        {balance >= 0 ? (
                            <ArrowOutward style={{ color: '#A6EA7C' }} />
                        ) : (
                            <ArrowOutward style={{ color: '#FF2701', transform: 'rotate(90deg)' }} />
                        )}
                        <Typography variant="h8" fontWeight={400} color="#00000040">
                            {title}
                        </Typography>
                    </Stack>
                    <Typography sx={{
                        color: balance >= 0 ? '#A6EA7C' : '#FF2701'
                    }}
                        fontSize={20} fontWeight={600}>
                        {currencyFormatter(balance)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card >
    );
}