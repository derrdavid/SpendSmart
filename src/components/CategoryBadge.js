import { Button, Divider, Grid, Input, List, ListItem, Popover, Stack, Typography, alpha } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryContext";
import { useExpenses } from "../hooks/ExpenseContext";
import { MoreHoriz, Remove } from "@mui/icons-material";

export const CategoryBadge = ({ category }) => {

    if (category == null || category.color == "") {
        category = {
            name: "none",
            color: "#AAAAAA"
        }
    }

    return (
        <>
            <span style={{
                minWidth: '50px', minHeight: '25px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1px',
                borderRadius: '4px',
                padding: '2px 8px',
                color: category.color,
                fontWeight: 'bold',
                backgroundColor: alpha(category.color, 0.2),
                border: `1px solid ${category.color}`,
            }}>
                {category.name}
            </span>

        </>

    );
}

export const CategoryBadgeEdit = ({ expense, category }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(category); // Hier wird die aktuelle ausgewählte Kategorie im lokalen State gespeichert

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <Button onClick={handleClick} sx={{ textTransform: 'none' }}>
                <CategoryBadge category={selectedCategory}></CategoryBadge>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <CategoryPopover expense={expense} handleClose={handleClose} setSelectedCategory={setSelectedCategory}>

                </CategoryPopover>
            </Popover>
        </div>
    )
}

const CategoryPopover = ({ expense, handleClose, setSelectedCategory }) => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const { updateItem, setItems } = useExpenses();

    const [tempCategory, setTempCategory] = useState({
        name: "",
        color: "#AAAAAA"
    });

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

    const handleAddButtonClick = async () => {
        if (tempCategory.name.trim().length > 0 != "") {
            handleClose();
            const newCategory = await addCategory(tempCategory);
            expense.category = newCategory;
            await updateItem(expense);
            setSelectedCategory(newCategory);
        }
    }

    const handleCategoryBadgeClick = async (category) => {
        handleClose();
        await updateItem({ ...expense, category: category });
        setSelectedCategory(category);
    }

    const handleRemoveCategory = (id) => {
        deleteCategory(id);
    }

    useEffect(() => {
        const newCategory = {
            name: "",
            color: randomHex()
        }
        setTempCategory(newCategory);
    }, [])

    return (
        <div style={{ width: '250px', padding: 5 }}>
            <Stack direction={'row'} spacing={2}>
                <Input inputProps={{ maxLength: 16, style: { fontSize: 13 } }} value={tempCategory.name} onChange={handleInputChange}></Input>
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

