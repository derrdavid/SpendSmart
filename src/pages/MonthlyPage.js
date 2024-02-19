import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useExpenses from '../hooks/useExpenses';

export default function MonthlyPage() {
    const { items, fetchItemsByDate, addItem, updateItem, deleteItems } = useExpenses();
    const [selectedItems, setSelectedItems] = useState([]);
    const [date, setDate] = useState(dayjs());
    const [page, setPage] = useState(1);

    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    const handleAddItem = async () => {
        await addItem(date);
        fetchItemsByDate(date);
    }

    const handleUpdateItem = async (newData) => {
        const newItem = await updateItem(newData);
        fetchItemsByDate(date);
        return newItem;
    }

    const handleDeleteItems = async () => {
        await deleteItems(selectedItems);
        fetchItemsByDate(date);
    }

    useEffect(() => {
        fetchItemsByDate(date);
    }, [date])


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div style={{
                height: 620,
                backgroundColor: '#3D4444',
                borderRadius: 2,
                padding: 2
            }}>
                <DataGrid
                    autoHeight={false}
                    style={{
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                        page: { page }
                    }}
                    editMode='row'
                    getRowId={(row) => row._id}
                    rows={items}
                    processRowUpdate={handleUpdateItem}
                    onProcessRowUpdateError={e => { console.log(e) }}
                    onRowSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selected = items.filter((row) =>
                            selectedIDs.has(row._id.toString()));
                        setSelectedItems(selected);
                    }}
                    columns={[
                        { field: 'name', headerName: 'name', width: 200, editable: true },
                        { field: 'category', headerName: 'category', type: 'number', width: 200, editable: true },
                        {
                            field: 'price', headerName: 'price', type: 'number', width: 100, editable: true, valueFormatter: (params) => {
                                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                    params.value,
                                )
                            }
                        },
                    ]}
                    pageSize={10}
                    pageSizeOptions={[5, 10, 25]}
                    rowHeight={50}
                    checkboxSelection
                />
                <Stack style={{
                    backgroundColor: '#3D4444',
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: "right"
                }} direction="row" spacing={3}>
                    <Typography color='white' variant="h4" fontWeight={800} m="5px" align="right">Total Price: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                        totalPrice
                    )}</Typography>
                    <Button onClick={handleAddItem} color="success" size="large" variant="contained">+</Button>
                    <Button onClick={handleDeleteItems} color="error" variant="outlined"> DELETE {selectedItems.length > 0 ? `[${selectedItems.length}]` : ''}</Button>
                </Stack>
            </div>
            <div style={{
                position: 'relative',
                justifyContent: 'center',
                backgroundColor: '#3D4444',
                borderRadius: 2,
                padding: 2
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        sx={{
                            color: 'white'
                        }}
                        openTo='month'
                        views={['year', 'month']}
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                    >

                    </DateCalendar>
                </LocalizationProvider>
            </div>
        </div>
    );
}