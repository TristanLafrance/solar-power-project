import { useEffect, useState } from "react";
import styled from "styled-components";
import ChartDataPayback from "./ChartDataPayback";
import ChartDataPannel from "./ChartDataPannel";

const Result = () => {
    const [ resultData, setResultData ] = useState(null);
    const id = sessionStorage.getItem("id")
    const collection = sessionStorage.getItem("collection")
    
    // Depending on the sessionStorage collection's value it will get the result from the data base
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
            })
        }
        }, [])


    if(collection === "payback" && resultData !== null){
        /* If users took the first option - When does it get worth it? - this JSX will render  */
        return (
            <StyledParent>
                <StyledHeader>Here is your result:</StyledHeader>
                <StyledChartContainer>
                    <ChartDataPayback dataToPush={resultData} />
                </StyledChartContainer>
                <StyledContainer>
                    <StyledInfo>
                        As you can see, it will take around {resultData.data.timePaybackYear} years and about {resultData.data.timePaybackDay} days  to pay back your inital investment.
                    </StyledInfo>
                    <StyledInfo>
                        Your system will output around {resultData.data.systemOutputPerDay} kWH per day and about {resultData.data.systemOutputPerYear} kWh per year.
                    </StyledInfo>
                    <StyledInfo>
                        Finally your system will output around ${resultData.data.moneyPerDay} per day and about ${resultData.data.moneyPerYear} per year. 
                    </StyledInfo>
                </StyledContainer>
            </StyledParent>
        )
    } else if(collection === "yourPannel" && resultData !== null){
        /* If users took the second option - How much will I make ? - this JSX will render  */
        return (
            <StyledParent>
                <StyledHeader>Here is your result:</StyledHeader>
                <StyledChartContainer>
                    <ChartDataPannel dataToPush={resultData} />
                </StyledChartContainer>
                <StyledContainer>
                    <StyledInfo>
                        Your system will output around {resultData.data.systemOutputPerDay} kWH per day and about {resultData.data.systemOutputPerYear} kWh per year.
                    </StyledInfo>
                    <StyledInfo>
                        Finally your system will output around ${resultData.data.moneyPerDay} per day and about ${resultData.data.moneyPerYear} per year. 
                    </StyledInfo>
                </StyledContainer>
            </StyledParent>
        )
    } else {
        /* While loading... */
        return (
            <div>
                Loading ... 
            </div>
        )
    }
};

export default Result;

// Styled-components

const StyledParent = styled.div`
    margin-top:  60px;
    margin-left: auto;
`


const StyledContainer = styled.div`
    margin: 50px 0px 0px 30%;
    font-weight: bold;
    font-size: 20px;
`

const StyledInfo = styled.div`
    margin-bottom: 15px;
`

const StyledHeader = styled.h1`
    margin: 80px 0px 30px 40%;

`

const StyledChartContainer = styled.div`
`