import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const ChartDataPannel = ({ dataToPush }) => {
    // String to number, so it can be use in the graph data. //
    const moneyPerYear = parseInt(dataToPush.data.moneyPerYear)
    
    const data = [];
    let result = moneyPerYear;
    // for loop to render the year and amount variable // 
    for(let num = 0; num <= 10; num++){
        data.push({
            year: num,
            amount: result
        })
        result = result + moneyPerYear
    }
        
    return (
            /* Dynamic chart JSX ---> */
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X axis controlls the Year variable */}
                    <XAxis dataKey="year" 
                    tickFormatter={number => ` Year ${number}`}
                    />
                    {/* The Y axis controlls the amount variable */}
                    <YAxis dataKey="amount" 
                    tickFormatter={number => `$${number}`}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
    )
};


export default ChartDataPannel;