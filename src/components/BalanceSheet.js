import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import currencyFormatter from "../utils/currencyFormatter";

export default function BalanceSheet(date) {
    return (
        <Card sx={{ boxShadow: 0, backgroundColor: '#F4F4F2', borderRadius: 5, }}>
            <CardContent sx={{padding: 3}}>
                <Stack orientation="column" spacing={1}>
                    <Typography variant="h8" fontWeight={400} color="#00000040" >
                        Month Budget
                    </Typography>
                    <Typography variant="h4" fontWeight={600}>
                        100€
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}