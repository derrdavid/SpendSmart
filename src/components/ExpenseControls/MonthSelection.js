import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

export default function MonthSelection({ date, setDate }) {
    const [open, setOpen] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                onClose={() => setOpen(false)}
                open={open}
                openTo="month"
                views={['year', 'month']}
                value={date}
                onChange={(newDate) => {
                    setOpen(false);
                    setDate(newDate);
                }}
                sx={{
                    backgroundColor: '#F4F4F2',
                }}
                slotProps={{
                    textField: {
                        onClick: () => setOpen(true),
                        variant: 'outlined',
                        inputProps: {
                            onMouseDown: (e) => e.preventDefault(),
                            readOnly: true,
                            style: {
                                textAlign: 'center',
                                cursor: 'pointer'
                            }
                        }
                    },
                }}

            />
        </LocalizationProvider>
    );
}