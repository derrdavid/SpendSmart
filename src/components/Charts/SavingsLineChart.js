import { Card, CardContent, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import currencyFormatter from "../../utils/currencyFormatter";


export const SavingsLineChart = ({ expensesList, savingsList, year }) => {

    return (
        <Stack direction={"row"} gap={2}>
            <Card
                sx={{
                    height: '30vh',
                    boxShadow: 0,
                    backgroundColor: '#F4F4F2',
                    borderRadius: '2em',
                }}
            >
                <CardContent sx={{
                    height: '100%',
                    width: '50vh'
                }}>
                    <Typography position={'relative'} top={10} padding={2} variant="h8" fontWeight={400} color="#00000040">
                        Savings {year}
                    </Typography>
                    <LineChart
                        sx={{
                            marginBottom: 3
                        }}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        series={[
                            {
                                label: 'Expenses',
                                color: 'black',
                                data: expensesList,
                                valueFormatter: currencyFormatter
                            },
                            {
                                label: 'Savings',
                                color: '#9cbc81',
                                data: savingsList,
                                valueFormatter: currencyFormatter
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </Stack>
    );
}

const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
