import { createContext, useContext, useState } from "react"
import apiService from "../services/apiService";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const collectionName = 'budgets';

    const [budgetsFetched, setBudgetsFetched] = useState(false);
    const [budgets, setBudgets] = useState(new Array(12));
    const [budgetList, setBudgetList] = useState(new Array(12).fill(0));

    const fetchBudgetsByYear = async (year) => {
        setBudgetsFetched(false);
        try {
            const responseData = await apiService.fetchByYear(collectionName, year);

            const updatedBudgets = new Array(12);
            responseData.forEach(item => {
                const month = new Date(item.date).getMonth();
                updatedBudgets[month] = item;
            });

            setBudgets(updatedBudgets);
            setBudgetsFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const addBudget = async (newBudget) => {
        const month = new Date(newBudget.date).getMonth();
        if (budgets[month]) {
            return budgets[month];
        }
        try {
            const responseData = await apiService.addOne(collectionName, newBudget);
            const updatedBudgets = [...budgets];
            const month = newBudget.date;

            updatedBudgets[month] = responseData;
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

            updatedBudgets[month] = responseData;
            setBudgets(updatedBudgets);

            return responseData;
        } catch (error) {
            console.error('Error while updating a Budget:', error);
        }
    };

    const calculateBudgetsPerMonth = () => {
        const amounts = new Array(12).fill(0);
        budgets.forEach((item) => {
            if (item != null) {
                const month = new Date(item.date).getMonth();
                amounts[month] = item.amount;
            }
        });
        setBudgetList(amounts);
        return amounts;
    };


    return (
        <BudgetContext.Provider value={{
            budgetsFetched, budgets, budgetList, updateBudget, addBudget, calculateBudgetsPerMonth, fetchBudgetsByYear
        }}>
            {children}
        </BudgetContext.Provider>
    );
}

export const useBudgets = () => useContext(BudgetContext);