import React, { createContext, useState, useContext, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const url = "http://localhost:3002/expenses/";
    const [items, setItems] = useState([]);

    const fetchItems = () => {
        return fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
                return res.json();
            })
            .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }

    const fetchItemsByDate = async (date) => {
        const parsedDate = await new Date(date);
        return fetch(`${url}${parsedDate.getFullYear()}/${parsedDate.getMonth() + 1}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fehler beim Abrufen der Daten');
                }
                return res.json();
            })
            .then((data) => {
                const tempData = [...data];
                setItems(tempData)
            })
            .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    }

    const addItem = async (date) => {
        const newItem = {
            name: "",
            category: null,
            price: 0,
            date: new Date(date)
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
            })
            .catch(error => console.error('Fehler beim Hinzufügen einer Zeile:', error));
    }

    const updateItem = async (params) => {
        const { ...updatedItem } = params;
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

            const updatedItems = items.map(item => item._id === responseData._id ? responseData : item);
            setItems(updatedItems);

            return responseData;
        } catch (error) {
            console.error('Fehler beim Aktualisieren einer Zeile:', error);
        }
    };


    const deleteItems = (selectedItems) => {
        if (selectedItems.length > 0) {
            const jsonBody = {
                ids: selectedItems
            };
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonBody)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Fehler beim Löschen einer Zeile');
                }
            })
                .catch(error => console.error('Fehler beim Löschen einer Zeile:', error));
        }
    }
    return (
        <ExpenseContext.Provider value={{ items, setItems, fetchItemsByDate, addItem, updateItem, deleteItems, fetchItems }}>
            {children}
        </ExpenseContext.Provider>
    );
}
export const useExpenses = () => useContext(ExpenseContext);
