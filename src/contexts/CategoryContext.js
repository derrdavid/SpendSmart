import { createContext, useContext, useEffect, useState } from "react"
import apiService from "../services/apiService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const collectionName = 'categories';
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, []);

    const fetchCategories = async () => {
        try {
            const responseData = await apiService.fetch(collectionName);
            setCategories([...responseData]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addCategory = async (input) => {
        const newCategory = {
            name: input.name,
            color: input.color
        };

        try {
            if (categories.length >= 10) {
                throw new Error("Maximum amount of categories reached.");
            }

            const responseData = await apiService.addOne(collectionName, newCategory);
            setCategories((prevCategories) => [...prevCategories, responseData]);

            return responseData;
        } catch (error) {
            console.error('Error creating a new category:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await apiService.deleteOne(collectionName, id);

            const updatedCategories = categories.filter(category => category._id !== id);
            setCategories([...updatedCategories]);
        } catch (error) {
            console.error("Error deleting the category:", error);
        }
    }


    return (
        <CategoryContext.Provider value={{
            categories, fetchCategories, addCategory, deleteCategory
        }}>
            {children}
        </CategoryContext.Provider>
    );
}
export const useCategories = () => useContext(CategoryContext);