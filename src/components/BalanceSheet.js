import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useExpenses } from "../hooks/ExpenseContext";
import { useEffect, useState } from "react";
import currencyFormatter from "../utils/currencyFormatter";

export default function BalanceSheet() {
    const [total, setTotal] = useState({});
    const { filteredExpenses } = useExpenses();

    useEffect(() => {
        calcCategorySum();
    }, [filteredExpenses]);

    const calcCategorySum = () => {
        const tempTotal = {};

        filteredExpenses.forEach((item) => {
            if (item.category !== null) {
                const categoryName = item.category.name;
                const categoryPrice = item.price;

                if (!tempTotal.hasOwnProperty(categoryName)) {
                    tempTotal[categoryName] = 0;
                }

                tempTotal[categoryName] += categoryPrice;
            }
        });

        setTotal(tempTotal);
    };

    const calcTotalSum = () => {
        let totalSum = 0;

        filteredExpenses.forEach((item) => {
            totalSum += item.price;
        });

        return totalSum;
    };

    return (
        <div style={{
            height: '100%',
        }}>
            <TableContainer sx={{
                backgroundColor: '#F4F4F2',
                borderRadius: 5,
                boxShadow: 1
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody height={200}>
                        {
                            Object.entries(total).map(([name, sum], i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell size="small">{name}</TableCell>
                                        <TableCell size="small">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                            sum
                                        )}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>

                    <TableFooter style={{
                        position: 'sticky',
                        bottom: 0
                    }}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>{
                                currencyFormatter(calcTotalSum())
                            }</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div >
    );
}