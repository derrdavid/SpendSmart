import { createContext, useContext, useEffect, useState } from "react"

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const url = "http://localhost:3002/categories/";
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Categories.');
            }
            
            const responseData = await response.json();
            setCategories([...responseData]);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    const addCategory = async (input) => {
        const newCategory = {
            name: input.name,
            color: input.color
        };
    
        try {
            if (categories.length >= 10) {
                throw new Error("Maximum number of categories reached.");
            }
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });
    
            if (!response.ok) {
                throw new Error("Failed to create a new category.");
            }
    
            const responseData = await response.json();
            setCategories((prevCategories) => [...prevCategories, responseData]);
            
            return responseData;
        } catch (error) {
            console.error('Error creating a new category:', error);
        }
    };    

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(url + id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("Failed to delete the category.");
            }

            const updatedCategories = categories.filter(category => category._id !== id);
            setCategories([...updatedCategories]);
        } catch (error) {
            console.error("Error deleting the category:", error);
        }
    }


    return (
        <CategoryContext.Provider value={{ categories, fetchCategories, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}
export const useCategories = () => useContext(CategoryContext);