import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function MonthSelection({date, setDate}){
    return(
        <div style={{
            position: 'relative',
            justifyContent: 'center',
            backgroundColor: '#3D4444',
            padding: 2
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    sx={{
                        color: 'white'
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