import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider, MonthCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

function Table() {
    const url = "http://localhost:3002/";
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [date, setDate] = useState(dayjs());
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const fetchItems = () => {
        return fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
                return res.json();
            })
            .then((data) => setItems(data))
            .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }

    const fetchItemsByDate = () => {
        return fetch(`${url}${date.$y}/${date.$M + 1}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
                return res.json();
            })
            .then((data) => setItems(data))
            .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }

    const addRow = async () => {
        const newItem = {
            name: "",
            category: 0,
            price: 0,
            date: new Date(date.$d)
        };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fehler beim Hinzufügen einer Zeile');
                }
                fetchItemsByDate();
            })
            .catch(error => console.error('Fehler beim Hinzufügen einer Zeile:', error));
    }

    const updateRow = async (params) => {
        const { ...updatedItem } = params; // Entfernen Sie die Felder id und _id, da sie nicht im Body des PUT-Requests benötigt werden
        try {
            const response = await fetch(`${url}${params._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItem)
            });
            if (!response.ok) {
                throw new Error('Fehler beim Aktualisieren einer Zeile');
            }
            const responseData = await response.json();
            fetchItemsByDate();
            return responseData;
        } catch (error) {
            console.error('Fehler beim Aktualisieren einer Zeile:', error);
        }
    }


    const deleteRows = async () => {
        const jsonBody = {
            ids: selectedItems
        };
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Fehler beim Löschen einer Zeile');
            }
            // Aktualisieren Sie den Zustand nach erfolgreichem Hinzufügen
            fetchItems();
        })
            .catch(error => console.error('Fehler beim Löschen einer Zeile:', error));
    }

    useEffect(() => {
        fetchItemsByDate();
    }, [date])

    const displayLastPage = (e) => {
        const page = Math.ceil(items.length / pageSize);
        setPage(page);
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price, 0); // Summiere die Preise

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
                    processRowUpdate={updateRow}
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
                        { field: 'price', headerName: 'price', type: 'number', width: 100, editable: true },
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
                    <Typography color='white' variant="h4" fontWeight={800} m="5px" align="right">Total Price: {totalPrice}</Typography>
                    <Button onClick={() => {
                        addRow();
                        displayLastPage();
                    }} color="success" size="large" variant="contained">+</Button>
                    <Button onClick={deleteRows} color="error" variant="outlined"> DELETE {selectedItems.length > 0 ? `[${selectedItems.length}]` : ''}</Button>
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

export default Table;
