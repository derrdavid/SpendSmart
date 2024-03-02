import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export function DateProvider({ children }) {

    const [date, setDateState] = useState(dayjs());
    const [year, setYear] = useState(dayjs().year());
    const [month, setMonth] = useState(dayjs().month());

    const setDate = (newDate) => {
        setDateState(newDate);
        setYear(newDate.year());
        setMonth(newDate.month());
    }

    return (
        <DateContext.Provider value={{ date, setDate, year, month }}>
            {children}
        </DateContext.Provider>
    );
}

export const useDate = () => useContext(DateContext);