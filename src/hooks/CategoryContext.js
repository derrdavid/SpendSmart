import { createContext, useContext, useEffect, useState } from "react"

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const url = "http://localhost:3002/categories/";
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories();
    }, []);

    // get
    const getAllCategories = () => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fehler beim Abrufen der Categories.");
                }
                return res.json();
            })
            .then((data) => {
                setCategories([...data]);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Daten:', error);
            })
    }
    // post
    const addCategory = async (input) => {

        const newCategory = {
            name: input.name,
            color: input.color
        };

        try {

            if (categories.length >= 10) {
                throw new Error("max amount of categories reached");
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error("Fehler beim Erstellen von Category");
            }

            const data = await response.json();
            setCategories((prevCategories) => [...prevCategories, data]);
            return data;
        } catch (error) {
            console.error('Fehler beim Erstellen einer Category:', error);
        }
    };

    // delete
    const deleteCategory = (id) => {
        fetch(url + id, {
            method: 'DELETE'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fehler beim Löscher von Category");
                }
                return res.json();
            })
            .then(() => {
                const updatedCategories = categories.filter(category => category._id !== id);
                console.log(updatedCategories)
                setCategories([...updatedCategories]);
            })
            .catch(error => console.error("Fehler beim Löschen von Category: ", error));
    }

    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}
export const useCategories = () => useContext(CategoryContext);