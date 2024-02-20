import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useExpenses } from "../hooks/ExpenseContext";
import { useEffect, useState } from "react";

export default function BalanceSheet() {
    const { items } = useExpenses();
    const [total, setTotal] = useState(0);
    const [entries, setEntries] = useState({});

    useEffect(() => {
        const { groupedCategories, totalSum } = groupAndSumByCategory(items);
        setEntries(groupedCategories);
        setTotal(totalSum);
    }, [items]);

    const groupAndSumByCategory = (items) => {
        let totalSum = 0;
        const groupedCategories = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = { category: item.category, total: 0 };
            }
            acc[item.category].total += item.price;
            totalSum += item.price;
            return acc;
        }, {});

        return { groupedCategories, totalSum };
    }


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
                            Object.values(entries).map((entry, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell size="small">{entry.category}</TableCell>
                                        <TableCell size="small">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                            entry.total,
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
                                new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                    total,
                                )
                            }</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div >
    );
}