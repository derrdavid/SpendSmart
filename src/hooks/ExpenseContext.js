import React, { createContext, useState, useContext, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const url = "http://localhost:3002/expenses/";
    const [allExpenses, setAllExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
        // eslint-disable-next-line
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            setAllExpenses([...responseData]);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };    

    const filterExpensesByDate = async (date) => {
        const selectedMonth = new Date(date).getMonth();
        const filteredExpenses = allExpenses.filter((expense) => {
            const expenseMonth = new Date(expense.date).getMonth();
            return expenseMonth === selectedMonth;
        });
        setFilteredExpenses([...filteredExpenses]);
    }

    const addExpense = async (date) => {
        const newItem = {
            name: "",
            category: null,
            price: 0,
            date: new Date(date)
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                throw new Error('Failed to add a new expense.');
            }

            const responseData = await response.json();
            setAllExpenses((prev) => [...prev, responseData]);

        } catch (error) {
            console.error('Error while adding a new expense:', error);
        }
    }

    const updateExpense = async (params) => {
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
                throw new Error('Failed to update an expense.');
            }
            const responseData = await response.json();

            const updatedItems = allExpenses.map(item => item._id === responseData._id ? responseData : item);
            setAllExpenses(updatedItems);

            return responseData;
        } catch (error) {
            console.error('Error while updating an expense:', error);
        }
    };

    const deleteExpenses = async (selectedItems) => {
        if (selectedItems.length > 0) {
            const jsonBody = {
                ids: selectedItems
            };
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonBody)
                });

                const updatedItems = allExpenses.filter(item => {
                    const isSelected = selectedItems.some(selectedItem => selectedItem._id === item._id);
                    return !isSelected;
                });

                setAllExpenses(updatedItems);

                if (!response.ok) {
                    throw new Error('Failed to delete an expense.');
                }
            } catch (error) {
                console.error('Error while deleting an expense:', error);
            }
        }
    }

    return (
        <ExpenseContext.Provider value={{
            allExpenses, setAllExpenses, filterExpensesByDate,
            addExpense, updateExpense, deleteExpenses, fetchExpenses,
            filteredExpenses, setFilteredExpenses
        }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export const useExpenses = () => useContext(ExpenseContext);
