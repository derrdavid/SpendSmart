import { alpha } from "@mui/material";
import React from "react";

export const CategoryBadge = ({ category }) => {

    if (category === null || category.color === "") {
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

