import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Table() {
    const [items, setItems] = useState([]);
    const url = "http://localhost:3000/";

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

    const addRow = () => {
        const newItem = {
            name: "",
            category: 0,
            price: 0,
        };

        fetch(url, {
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
                // Aktualisieren Sie den Zustand nach erfolgreichem Hinzufügen
                fetchItems();
            })
            .catch(error => console.error('Fehler beim Hinzufügen einer Zeile:', error));
    }

    const updateRow = (row) => {
        return fetch(`${url}${row._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fehler beim Aktualisieren der Zeile');
                }
                fetchItems();
            })
            .catch(error => console.error('Fehler beim Aktualisieren der Zeile:', error));
    }

    const deleteRow = (id) => {
        return fetch(url + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fehler beim Löschen einer Zeile');
                }
                fetchItems();
            })
            .catch(error => console.error('Fehler beim Löschen einer Zeile:', error));
    }

    const swapRows = (id1, id2) => {

    }

    useEffect(() => {
        fetchItems();
    }, [])


    return (
        <div>
            <DataGrid
                editMode='row'
                getRowId={(row) => row._id}
                rows={items}
                columns={[
                    { field: 'name', headerName: 'name', width: 200, editable: true },
                    { field: 'category', headerName: 'category', type: 'number', width: 200, editable: true },
                    { field: 'price', headerName: 'price', type: 'number', width: 100, editable: true },
                ]}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                processRowUpdate={async (newRow) => {
                    await updateRow(newRow);
                    return newRow;
                }}
                onProcessRowUpdateError={(e) => { console.log(e) }}
            />
        </div>
    );
}

export default Table;
