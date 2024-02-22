import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useExpenses } from "../hooks/ExpenseContext";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryContext";

export default function BalanceSheet() {
    const [total, setTotal] = useState(0);
    const { items } = useExpenses();
    const { categories } = useCategories();

    useEffect(() => {
        setTotal(0);
    }, [items]);

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
                            categories.map((entry, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell size="small">{entry.category}</TableCell>
                                        <TableCell size="small">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                            100
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