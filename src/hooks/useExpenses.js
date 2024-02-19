import React, { useState } from 'react';

export default function useExpenses() {
    const url = "http://localhost:3002/";
    const [items, setItems] = useState([]);

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

    const fetchItemsByDate = (date) => {
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

    const addItem = async (date) => {
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

    const updateItem = async (params) => {
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


    const deleteItems = async (selectedItems) => {
        console.log(selectedItems);
        /* const jsonBody = {
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
            .catch(error => console.error('Fehler beim Löschen einer Zeile:', error)); */
    }

    return { items, fetchItemsByDate, addItem, updateItem, deleteItems};
}