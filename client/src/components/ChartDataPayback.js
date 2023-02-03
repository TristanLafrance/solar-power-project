import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const ChartDataPayback = ({ dataToPush }) => {
    // Declaring/Renaming variable from the data base //
    const yearToPayback = dataToPush.data.timePaybackYear
    const moneyPerYear = dataToPush.data.moneyPerYear
    const cost = dataToPush.data.cost
    const data = [];

    let result = cost;

    // for loop to render the year and amount variable // 
    for(let num = 0; num <= yearToPayback; num++){
        data.push({
            year: num,
            amount: result
        })
        result = result - moneyPerYear
    }
        
    return (
            /* Dynamic chart JSX */
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X axis controlls the year variable */}
                    <XAxis dataKey="year" 
                    tickFormatter={number => ` Year ${number}`}
                    />
                    {/* Y axis controlls the amount variable */}
                    <YAxis dataKey="amount" 
                    tickFormatter={number => `$${number}`}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
    )
};


export default ChartDataPayback;