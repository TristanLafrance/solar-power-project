import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const ChartDataPayback = ({ dataToPush }) => {
    console.log(dataToPush)
    console.log(dataToPush.data)
    const yearToPayback = dataToPush.data.timePaybackYear
    const moneyPerYear = dataToPush.data.moneyPerYear
    const cost = dataToPush.data.cost
    const data = [];
    

    for(let num = 0; num <= yearToPayback; num++){
        let result = cost;
        // just need to make the result - moneyPerYear everyLoop
        console.log(num, result)
        data.push({
            year: num,
            value: result
        })
    }
        
    return (
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} >
                    <XAxis dataKey="year" />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
    )
};


export default ChartDataPayback;