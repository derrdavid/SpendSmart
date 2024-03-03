import { createContext, useContext, useEffect, useState } from "react"
import apiService from "../services/apiService";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const collectionName = 'budgets';
    const [budgets, setBudgets] = useState(new Array(12));

    const fetchBudgetsByYear = async (year) => {
        try {
            const responseData = await apiService.fetchByYear(collectionName, year);

            const updatedBudgets = new Array(12);
            responseData.forEach(item => {
                const month = new Date(item.date).getMonth();
                updatedBudgets[month - 1] = item;
            });

            setBudgets(updatedBudgets);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    const addBudget = async (newBudget) => {
        const month = new Date(newBudget.date).getMonth();
        if (budgets[month - 1]) {
            return budgets[month - 1];
        }
        try {
            const responseData = await apiService.addOne(collectionName, newBudget);
            const updatedBudgets = [...budgets];
            const month = newBudget.date;

            updatedBudgets[month - 1] = responseData;
            setBudgets(updatedBudgets);

            return responseData;
        } catch (error) {
            console.error('Error creating a new budget:', error);
        }
    }

    const updateBudget = async (newBudget) => {
        try {
            const responseData = await apiService.updateOne(collectionName, newBudget);
            const updatedBudgets = [...budgets];
            const month = new Date(newBudget.date).getMonth();

            updatedBudgets[month - 1] = responseData;
            setBudgets(updatedBudgets);

            return responseData;
        } catch (error) {
            console.error('Error while updating a Budget:', error);
        }
    };

    const getAmounts = () => {
        const amounts = new Array(12).fill(0);
        budgets.forEach((item) => {
            if (item != null) {
                const month = new Date(item.date).getMonth() - 1;
                amounts[month] = item.amount;
            }
        })

        return amounts;
    }

    return (
        <BudgetContext.Provider value={{ budgets, updateBudget, addBudget, getAmounts, fetchBudgetsByYear }}>
            {children}
        </BudgetContext.Provider>
    );
}

export const useBudgets = () => useContext(BudgetContext);