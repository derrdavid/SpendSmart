import { Button, Popover } from "@mui/material";
import React, { useState } from "react";
import { CategoryBadge } from "./CategoryBadge";
import { CategorySelectionPopover } from "./CategorySelectionPopover";

export const CategoryBadgeEditMode = ({ expense, category }) => {
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
                <CategorySelectionPopover expense={expense} handleClose={handleClose} setSelectedCategory={setSelectedCategory}>
                </CategorySelectionPopover>
            </Popover>
        </div>
    )
}