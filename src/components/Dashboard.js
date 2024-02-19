import React from 'react';
import { Drawer, List, ListItemText, Divider, Typography, ListItemButton, ListItemIcon, Container } from '@mui/material';
import { BarChartRounded, CreditCard, DashboardRounded, InfoRounded, ReceiptRounded } from '@mui/icons-material';
import Table from '../pages/MonthlyExpenses';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', height: '90vh' }}>
            {/* Linke Leiste */}
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: '#2C3333',
                        color: '#E7F6F2'
                    }
                }}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Typography variant="h3" align="center" sx={{ mt: 5, mb: 5, fontWeight: 300 }}>
                    <CreditCard sx={{ fontSize: '40px', m: 1 }} />
                    Spend
                    Smart
                </Typography>
                <Divider />
                <List>
                    <ListItemButton className='listItemButton'>
                        <ListItemIcon>
                            <DashboardRounded></DashboardRounded>
                        </ListItemIcon>
                        <ListItemText primary="Overview" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptRounded></ReceiptRounded>
                        </ListItemIcon>
                        <ListItemText primary="Monthly Expenses" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartRounded></BarChartRounded>
                        </ListItemIcon>
                        <ListItemText primary="Statistics" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoRounded></InfoRounded>
                        </ListItemIcon>
                        <ListItemText primary="about" />
                    </ListItemButton>
                </List>
                <Divider />
            </Drawer>
            <div style={{
                backgroundColor: '#2C3333',
                width: '100%',   
                justifyContent: 'center'
            }}>
                <Table></Table>
            </div>
        </div>
    );
}

export default Dashboard;
