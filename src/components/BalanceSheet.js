import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useExpenses } from "../hooks/ExpenseContext";
import { useEffect, useState } from "react";

export default function BalanceSheet() {
    const { items } = useExpenses();
    const [total, setTotal] = useState(0);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        console.log("CALL")
    }, [items]);

    return (
        <div style={{
            height: '100%',
            backgroundColor: '#3D4444'
        }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>{total} Euro</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}