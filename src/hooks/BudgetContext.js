import { createContext, useContext, useEffect, useState } from "react"

const BudgetContext = createContext();

export const BudgetProvider = ({ children, date }) => {
    const url = `${process.env.REACT_APP_URL}/budgets/`;
    const [budgets, setBudgets] = useState(new Array(12));
    let year = date.$d.getFullYear();

    useEffect(() => {
        fetchBudgetsByYear(year);
    }, [year]);

    const fetchBudgetsByYear = async (year) => {
        try {
            const response = await fetch(`${url}${year}`);
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Budgets.');
            }
            const responseData = await response.json();

            const updatedBudgets = new Array(12); // Kopiere das vorhandene budgets Array

            responseData.forEach(item => {
                const month = new Date(item.date).getMonth();
                updatedBudgets[month - 1] = item;
            });

            setBudgets(updatedBudgets);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }

    const addBudget = async (input) => {
        const month = new Date(input.date).getMonth();
        if (budgets[month - 1]) {
            return budgets[month - 1];
        }

        const newBudget = {
            amount: input.amount,
            date: new Date(input.date)
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBudget)
            })

            if (!response.ok) {
                throw new Error("Failed to create a new budget.");
            }

            const responseData = await response.json();
            const updatedBudgets = [...budgets];
            const month = new Date(input.date).getMonth();

            updatedBudgets[month - 1] = responseData;
            setBudgets(updatedBudgets);

            return responseData;
        } catch (error) {
            console.error('Error creating a new budget:', error);
        }
    }

    const updateBudget = async (input) => {
        const { ...updatedBudget } = input;
        try {
            const response = await fetch(`${url}${input._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBudget)
            });
            if (!response.ok) {
                throw new Error('Failed to update a Budget.');
            }
            const responseData = await response.json();
            const updatedBudgets = [...budgets];
            const month = new Date(input.date).getMonth();

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
        <BudgetContext.Provider value={{ budgets, updateBudget, addBudget, getAmounts }}>
            {children}
        </BudgetContext.Provider>
    );
}

export const useBudgets = () => useContext(BudgetContext);