import { createContext, useEffect, useState } from "react"

const BudgetContext = createContext();

export const BudgetProvider = () => {
    const url = "http://localhost:3002/budgets/";
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Budgets.');
            }
            const responseData = await response.json();
            setBudgets([...responseData]);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    

}