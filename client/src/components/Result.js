import { useEffect, useState } from "react";
import styled from "styled-components";
import ChartDataPayback from "./ChartDataPayback";



const Result = () => {
    const [ resultData, setResultData ] = useState(null);
    const id = sessionStorage.getItem("id")
    const collection = sessionStorage.getItem("collection")
    
    useEffect(() => {
        if(collection === "payback"){
            fetch(`/api/get-result-payback/${id}`)
            .then(res => res.json())
            .then(data => {
                setResultData(data)
            })
        } else if(collection === "yourPannel"){
            fetch(`/api/get-your-pannel/${id}`)
            .then(res => res.json())
            .then(data => {
                setResultData(data)
                console.log(data)
            })
        }
        }, [])

    if(collection === "payback" && resultData !== null){
        return (
            <StyledContainer>
                <ChartDataPayback dataToPush={resultData} />
            </StyledContainer>
        )
    } else if(collection === "yourPannel" && resultData !== null){
        // systemOutputPerDay: systemOutputPerDay,
        // systemOutputPerYear: systemOutputPerYear,
        // moneyPerDay: moneyPerDay,
        // moneyPerYear: moneyPerYear
        return (
            <StyledContainer>
                <div>
                    Your system will be able to output an average of {resultData.data.systemOutputPerDay} KwH/day
                </div>
                <div>
                    And {resultData.data.systemOutputPerYear} KwH/year
                </div>
                <div>
                    {resultData.data.moneyPerDay}
                </div>
                <div>
                    {resultData.data.moneyPerYear}
                </div>
            </StyledContainer>
        )
    } else {
        return (
            <div>
                Loading ... 
            </div>
        )
    }
};

export default Result;

const StyledContainer = styled.div`
    margin-top:  60px;
    margin-left: auto;
`