import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function MonthSelection({ date, setDate }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                openTo="month"
                views={['year', 'month']}
                value={date}
                onChange={(newDate) => {
                    setDate(newDate);
                }}
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        inputProps: {
                            style: {
                                textAlign: 'center'
                            }
                        }
                    },
                }}

            />
        </LocalizationProvider>
    );
}