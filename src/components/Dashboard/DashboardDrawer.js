import { Drawer, Typography } from '@mui/material';

export default function DashboardDrawer() {
    return (
        <Drawer
            PaperProps={{
                sx: {
                    backgroundColor: '#F4F4F2',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }
            }}
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    height: 50,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="top"
        >
            <Typography variant="h7" sx={{ ml: '25%', fontWeight: 900, display: 'inline' }}>
                Spend Smart
            </Typography>
        </Drawer >
    )
}