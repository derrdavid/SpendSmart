import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useExpenses } from '../hooks/ExpenseContext';
import { DataGrid } from "@mui/x-data-grid";
import { CategoryBadge } from './CategoryBadge/CategoryBadge';
import currencyFormatter from '../utils/currencyFormatter';
import { CategoryBadgeEditMode } from './CategoryBadge/CategoryBadgeEditMode';
import { useDate } from '../hooks/DateContext';

export default function ExpensesList() {
    const { fetched, filterExpensesByMonth,
        addExpense, updateExpense, deleteExpenses, filteredExpenses, fetchExpenses } = useExpenses();

    const { date, year, month } = useDate();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchExpenses(date);
    }, [year]);

    useEffect(() => {
        if (fetched) {
            filterExpensesByMonth(date);
        }
    }, [month, fetched]);

    const handleAddExpense = () => {
        addExpense(date);
    }

    const handleUpdateExpense = async (newData) => {
        if (newData !== null) {
            const newItem = await updateExpense({
                _id: newData._id,
                name: newData.name,
                price: newData.price
            });
            return newItem;
        }
    }

    const handleDeleteExpenses = () => {
        deleteExpenses(selectedItems);
    }

    return (
        <div style={{
            height: '60vh',
            padding: 2
        }}>
            <DataGrid
                sx={{
                    padding: 1,
                    width: '100%',
                    backgroundColor: '#F4F4F2',
                    borderRadius: 5,
                }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                editMode='row'
                getRowId={(row) => row._id}
                rows={filteredExpenses}
                processRowUpdate={handleUpdateExpense}
                onProcessRowUpdateError={e => { console.error(e) }}
                onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selected = filteredExpenses.filter((row) =>
                        selectedIDs.has(row._id.toString()));
                    setSelectedItems(selected);
                }}
                columns={[
                    { field: 'name', headerName: 'Name', width: 150, editable: true },
                    {
                        field: 'category', headerName: 'Category', width: 200, editable: true,
                        renderCell: (params) => <CategoryBadge category={params.row.category} />,
                        renderEditCell: (params) => {
                            return (
                                < CategoryBadgeEditMode expense={params.row} category={params.row.category} ></CategoryBadgeEditMode>
                            )
                        }
                    },
                    {
                        field: 'price', headerName: 'Price', type: 'number', width: 100, editable: true, valueFormatter: (params) => {
                            return currencyFormatter(params.value);
                        }
                    },
                ]}
                pageSize={10}
                pageSizeOptions={[5, 10, 25]}
                rowHeight={50}
                checkboxSelection
            />
            <Stack style={{
                padding: 5,
                justifyContent: "right"
            }} direction="row" spacing={3}>
                <Button onClick={handleAddExpense} size="large" variant="contained">+</Button>
                <Button onClick={handleDeleteExpenses} color="error" variant="outlined"> DELETE {selectedItems.length > 0 ? `[${selectedItems.length}]` : ''}</Button>
            </Stack>
        </div >
    )
}