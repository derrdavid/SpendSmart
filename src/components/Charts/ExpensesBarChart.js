import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import currencyFormatter from "../../utils/currencyFormatter";
import { Card, CardContent, Typography } from "@mui/material";

export const ExpensesBarChart = ({ expenses, categories, year }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        loadChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenses, year]);

    const loadChartData = async () => {
        try {
            const newChartData = [];

            categories.forEach(category => {
                const categoryData = [];
                for (let i = 0; i < 12; i++) {
                    const filteredData = expenses.filter(expense =>
                        expense.category && expense.category._id === category._id
                        && new Date(expense.date).getMonth() === i);
                    let sum = 0;
                    filteredData.forEach(expense => {
                        sum += expense.price;
                    });
                    categoryData.push(sum);
                }
                const categorySum = categoryData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                if (categorySum > 0) {
                    newChartData.push({
                        data: categoryData,
                        stack: 'total',
                        label: category.name,
                        color: category.color,
                        valueFormatter: currencyFormatter
                    });
                }
            });
            setChartData(newChartData);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <Card sx={{
            height: '30vh',
            boxShadow: 0,
            backgroundColor: '#F4F4F2',
            borderRadius: '2em',
        }}>
            <CardContent
                sx={{
                    height: '100%',
                    width: '100%'
                }}>
                <Typography position={'relative'} top={10} padding={2} variant="h8" fontWeight={400} color="#00000040">
                    Expenses {year}
                </Typography>
                <BarChart
                    sx={{
                        mt: -5
                    }}
                    slotProps={{
                        legend: {
                            hidden: true
                        }
                    }}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    series={chartData}
                >
                </BarChart>
            </CardContent>
        </Card >
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