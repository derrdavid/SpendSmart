import React, { useEffect, useState } from 'react';
import './Table.css';
import TableRow from './TableRow';

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

    const updateRow = (id, dataToUpdate) => {
        const jsonString = JSON.stringify(dataToUpdate);
        console.log(jsonString)
        fetch(url + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fehler beim Aktualisieren einer Zeile');
                }
                fetchItems();
            })
            .catch(error => console.error('Fehler beim Aktualisieren einer Zeile:', error));
    }

    const deleteRow = (id) => {
        fetch(url + id, {
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
        <div className="Table">
            <div className="Month-Selection">
                <h1>select month</h1>
            </div>
            <table>
                <thead>
                    <tr>
                    <td><h2></h2></td>
                        <td><h2></h2></td>
                        <td><h2></h2></td>
                        <td><h2>name</h2></td>
                        <td><h2>category</h2></td>
                        <td><h2>price</h2></td>
                        <td><h2></h2></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <TableRow
                            key={item._id}
                            rowData={item}
                            remove={deleteRow}
                            update={updateRow}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}></td>
                        <td colSpan={3}>
                            <button onClick={addRow}>add</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Table;
