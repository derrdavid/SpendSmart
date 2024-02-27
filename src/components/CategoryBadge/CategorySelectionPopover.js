import { Button, Divider, Grid, Input, List, ListItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCategories } from "../../hooks/CategoryContext";
import { useExpenses } from "../../hooks/ExpenseContext";
import { Remove } from "@mui/icons-material";
import { CategoryBadge } from "./CategoryBadge";

export const CategorySelectionPopover = ({ expense, handleClose, setSelectedCategory }) => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const { updateExpense } = useExpenses();

    const [inputError, setInputError] = useState(false);

    const [tempCategory, setTempCategory] = useState({
        name: "",
        color: "#AAAAAA"
    });

    useEffect(() => {
        const newCategory = {
            name: "",
            color: randomHex()
        }
        setTempCategory(newCategory);
    }, [])

    const randomHex = () => {
        const randomHexColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        return randomHexColor;
    }

    const handleInputChange = (e) => {
        setTempCategory(prevCategory => ({
            ...prevCategory,
            name: e.target.value
        }));
    }

    const handleInputFocus = () => {
        setInputError(false); // Setzen Sie den Fehler auf false, wenn das Eingabefeld den Fokus erhält
    };

    const handleAddButtonClick = async () => {
        if (tempCategory.name.trim(" ").length > 0) {
            handleClose();
            const newCategory = await addCategory(tempCategory);
            expense.category = newCategory;
            await updateExpense(expense);
            setSelectedCategory(newCategory);
        } else {
            setInputError(true);
        }
    }

    const handleCategoryBadgeClick = async (category) => {
        handleClose();
        await updateExpense({ ...expense, category: category });
        setSelectedCategory(category);
    }

    const handleRemoveCategory = (id) => {
        deleteCategory(id);
    }

    return (
        <div style={{ width: '250px', padding: 5 }}>
            <Stack direction={'row'} spacing={2} margin={1}>
                <TextField
                    label="Category"
                    variant="filled"
                    value={tempCategory.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    error={inputError}
                    helperText={inputError ? "Name the category." : ""}
                    inputProps={{
                        maxLength: 16,
                        style: { fontSize: 13 }
                    }}
                />
                <Button variant="contained" onClick={handleAddButtonClick}>+</Button>
            </Stack>
            <div style={{ margin: 5, marginLeft: 15, display: 'flex', alignItems: 'center' }}>
                <CategoryBadge category={tempCategory}></CategoryBadge>
            </div>
            <Divider></Divider>
            <List dense>
                {categories.map((category) => (
                    <ListItem key={category._id}  >
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button onClick={() => handleCategoryBadgeClick(category)} sx={{ textTransform: 'none' }}>
                                    <CategoryBadge category={category} />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => handleRemoveCategory(category._id)} color="error" sx={{ padding: '6px' }}>
                                    <Remove />
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
            <Divider></Divider>
        </div>
    );
}