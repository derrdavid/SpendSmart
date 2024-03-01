import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryContext";
import { useExpenses } from "../hooks/ExpenseContext";
import currencyFormatter from "../utils/currencyFormatter";
import { Card, CardContent, Stack, Typography } from "@mui/material";

export const ExpensesBarChart = (date) => {
    const [chartData, setChartData] = useState([]);
    const { categories } = useCategories();
    const { allExpenses } = useExpenses();

    useEffect(() => {
        loadChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allExpenses, date.date.$d.getFullYear()]);

    const loadChartData = async () => {
        try {
            const newChartData = [];

            categories.forEach(category => {
                const categoryData = [];
                for (let i = 0; i < 12; i++) {
                    const filteredData = allExpenses.filter(expense =>
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


    return (
        <Card sx={{
            height: '30vh',
            boxShadow: 0,
            backgroundColor: '#F4F4F2',
            borderRadius: '2em',
        }}>
            <CardContent
                sx={{
                    height: '30vh',
                    width: '100%'
                }}>
                <Typography position={'relative'} top={10} padding={2} variant="h8" fontWeight={400} color="#00000040">
                    Expenses {date.date.$d.getFullYear()}
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