import React from 'react';
import DashboardDrawer from './DashboardDrawer';
import MonthlyPage from '../pages/MonthlyPage';

export default function Dashboard() {
    return (
        <div style={{ display: 'flex', height: '90vh' }}>
            <DashboardDrawer />
            <div style={{
                backgroundColor: '#2C3333',
                width: '100%',
                justifyContent: 'center'
            }}>
                <MonthlyPage />
            </div>
        </div>
    );
}