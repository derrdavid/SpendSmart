import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/apiService';
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const collectionName = 'expenses';

    const [expensesFetched, setFetched] = useState(false);

    const [expenses, setExpenses] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [expensesList, setExpensesList] = useState(new Array(12).fill(0));
    const [avgExpenses, setAvgExpenses] = useState(0);

    const fetchExpensesByYear = async (year) => {
        setFetched(false);
        try {
            const responseData = await apiService.fetchByYear(collectionName, year);
            setExpenses([...responseData]);
            setFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const filterExpensesByMonth = async (month) => {
        const filteredExpenses = expenses.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return (expenseDate.getMonth() === month);
        });
        setMonthlyExpenses([...filteredExpenses]);
        calculateExpensesPerMonth();
    }

    const addExpense = async (date) => {
        const newExpense = {
            name: "",
            category: null,
            price: 0,
            date: new Date(date)
        };
        try {
            const responseData = await apiService.addOne(collectionName, newExpense);
            setExpenses((prev) => [...prev, responseData]);
            setMonthlyExpenses((prev) => [...prev, responseData]);
        } catch (error) {
            console.error('Error while adding a new expense:', error);
        }
    }

    const updateExpense = async (newExpense) => {
        try {
            const responseData = await apiService.updateOne(collectionName, newExpense);

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
            try {
                await apiService.deleteMany(collectionName, selectedExpenses);

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
            } catch (error) {
                console.error('Error while deleting an expense:', error);
            }
        }
    }

    const calculateExpensesPerMonth = () => {
        let sums = new Array(12).fill(0);

        expenses.forEach((item) => {
            const month = new Date(item.date).getMonth();
            sums[month] += item.price;
        })
        setExpensesList(sums);
        calculateAvgExpenses();
    }

    const calculateAvgExpenses = () => {
        let avg = 0;
        expensesList.forEach((item) => {
            avg += item;
        });
        avg /= expensesList.length;
        setAvgExpenses(avg);
    };

    return (
        <ExpenseContext.Provider value={{
            expensesFetched,
            expenses, setExpenses, filterExpensesByMonth,
            addExpense, updateExpense, deleteExpenses, fetchExpensesByYear,
            monthlyExpenses, setMonthlyExpenses,
            calculateExpensesPerMonth, expensesList, avgExpenses, calculateAvgExpenses
        }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export const useExpenses = () => useContext(ExpenseContext);
