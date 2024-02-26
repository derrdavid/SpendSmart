import { Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export const SavingsLineChart = () => {
    return (
        <div
            style={{
                height: '100%', backgroundColor: '#F4F4F2', borderRadius: '2em', boxShadow: 1
            }}
        >
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20] }]}
                series={[
                    {
                        color: 'black',
                        curve: 'linear',
                        data: [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8],
                    }
                ]}
                height={300}
            />
        </div>
    );
}