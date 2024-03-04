import { Drawer, Stack, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

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
            <Stack direction={'row'} sx={{ ml: '25%', display: 'inline' }} >
                <img src={logo} height={25} width={25}></img>
                <Typography variant="h7" sx={{ fontWeight: 900 }}>
                    Spend Smart
                </Typography>
            </Stack>

        </Drawer >
    )
}