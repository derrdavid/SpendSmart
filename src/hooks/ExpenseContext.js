import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDate } from './DateContext';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const url = `${process.env.REACT_APP_URL}/expenses/`;

    const [fetched, setFetched] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);

    const fetchExpensesByYear = async (date) => {
        try {
            setFetched(false);
            const response = await fetch(`${url}${date.year()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            setExpenses([...responseData]);
            setFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const filterExpensesByMonth = async (date) => {
        const selectedDate = new Date(date);

        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return (expenseDate.getYear() === selectedDate.getYear())
                && (expenseDate.getMonth() === selectedDate.getMonth());
        });

        setMonthlyExpenses([...filteredExpenses]);
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
            setExpenses((prev) => [...prev, responseData]);
            setMonthlyExpenses((prev) => [...prev, responseData]);

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

            const updatedExpenses = expenses.map(item => item._id === responseData._id ? responseData : item);
            const updatedFilteredExpenses = monthlyExpenses.map(item => item._id === responseData._id ? responseData : item);

            setExpenses(updatedExpenses);
            setMonthlyExpenses(updatedFilteredExpenses);

            return responseData;
        } catch (error) {
            console.error('Error while updating an expense:', error);
        }
    };

    const deleteExpenses = async (selectedExpenses) => {
        if (selectedExpenses.length > 0) {
            const jsonBody = {
                ids: selectedExpenses
            };
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonBody)
                });

                const updatedExpenses = expenses.filter(item => {
                    const isSelected = selectedExpenses.some(selectedItem => selectedItem._id === item._id);
                    return !isSelected;
                });

                const updatedFilteredExpenses = monthlyExpenses.filter(item => {
                    const isSelected = selectedExpenses.some(selectedItem => selectedItem._id === item._id);
                    return !isSelected;
                });

                setExpenses(updatedExpenses);
                setMonthlyExpenses(updatedFilteredExpenses);

                if (!response.ok) {
                    throw new Error('Failed to delete an expense.');
                }
            } catch (error) {
                console.error('Error while deleting an expense:', error);
            }
        }
    }

    const calculateSumsPerMonth = () => {
        let sums = new Array(12).fill(0);

        expenses.forEach((item) => {
            const month = new Date(item.date).getMonth();
            sums[month] += item.price;
        })
        return sums;
    }

    /**
   * Calculates the total expenses from filteredExpenses.
   */
    const calculateMonthlyTotalSum = () => {
        let totalSum = 0;

        monthlyExpenses.forEach((item) => {
            totalSum += item.price;
        });

        return totalSum;
    };

    return (
        <ExpenseContext.Provider value={{
            fetched,
            allExpenses: expenses, setAllExpenses: setExpenses, filterExpensesByMonth,
            addExpense, updateExpense, deleteExpenses, fetchExpenses: fetchExpensesByYear,
            filteredExpenses: monthlyExpenses, setFilteredExpenses: setMonthlyExpenses, calculateFilteredTotalSum: calculateMonthlyTotalSum,
            calculateSumsPerMonth
        }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export const useExpenses = () => useContext(ExpenseContext);
