import { Stack } from "@mui/material";
import { BalanceCard } from "./BalanceCard";
import { CurrencyCard } from "./CurrencyCard";

export function TotalCards({ savings, avg }) {

    return (
        <Stack direction='column' spacing={2} height={'40vh'}>
            <BalanceCard title={"Total Savings"} balance={savings} />
            <CurrencyCard title={"Avg.Monthly Expenses"} value={avg} />
        </Stack>
    );
}