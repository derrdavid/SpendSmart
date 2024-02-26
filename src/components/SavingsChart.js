import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryContext";
import { useExpenses } from "../hooks/ExpenseContext";

export const SavingsChart = () => {
    const [chartData, setChartData] = useState([]);
    const { categories } = useCategories();
    const { fetchItems, items } = useExpenses();

    useEffect(() => {
        initChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const initChartData = async () => {
        try {
            const allExpenses = await fetchItems();
            const newChartData = [];

            categories.forEach(category => {
                const categoryData = [];
                for (let i = 0; i < 12; i++) {
                    const filteredData = allExpenses.filter(expense =>
                        expense.category && expense.category._id === category._id && new Date(expense.date).getMonth() === i
                    );
                    console.log(allExpenses)
                    let sum = 0;
                    filteredData.forEach(expense => {
                        sum += expense.price;
                    });
                    categoryData.push(sum);
                }
                const categorySum = categoryData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                if (categorySum > 0) {
                    newChartData.push({ data: categoryData, stack: 'total', label: category.name, color: category.color });
                }
            });
            setChartData(newChartData);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };


    return (
        <div style={{
            height: '100%', backgroundColor: '#F4F4F2', borderRadius: '2em', boxShadow: 1

        }}>
            <BarChart
                series={chartData}
                width={600}
                height={350}>
            </BarChart>
        </div >
    );
}