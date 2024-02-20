import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function MonthSelection({ date, setDate }) {
    return (
        <div style={{
            position: 'relative',
            justifyContent: 'center',
            padding: 2
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    sx={{
                        backgroundColor: '#F4F4F2',
                        borderRadius: 5,
                        boxShadow: 1
                    }}
                    openTo='month'
                    views={['year', 'month']}
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                    }}
                >

                </DateCalendar>
            </LocalizationProvider>
        </div>
    );
}