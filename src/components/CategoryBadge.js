import { Button, Popover, Table, TableContainer, Typography } from "@mui/material";
import React, { useState } from "react";

export function CategoryBadge({ category }) {
    return (
        <>
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1px',
                borderRadius: '4px',
                padding: '2px 8px',
                color: '#059669',
                fontWeight: 'bold',
                backgroundColor: '#ECFDF5',
                border: '1px solid #059669',
            }}>
                {category}
            </span>

        </>

    );
}

export function CategoryBadgeEdit({ category }) {

    const [anchorEl, setAnchorEl] = useState(null);

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
            <Button onClick={handleClick}>
                <CategoryBadge category={category}></CategoryBadge>
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
                <div>
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </div>
            </Popover>
        </div>
    )
}