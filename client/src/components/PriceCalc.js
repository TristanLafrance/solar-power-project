import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {default as Input} from "./InputCalc";
import styled from "styled-components";
import savingsPots from "../assets/micheile-dot-com-ZVprbBmT8QA-unsplash.jpg"
import playingMoney from "../assets/towfiqu-barbhuiya-jpqyfK7GB4w-unsplash.jpg"

const PriceCalc = () => {
    const [formData, setFormData] = useState({});
    const id = sessionStorage.getItem("id");
    const history = useNavigate();

    const thirdFetch =  (data) => {
        console.log(data)
        const allData = {
            kWPerSquareMeter: data.annual,
            perKiloWattsHour: formData.perKiloWattsHour,
            numbSolarPanel: formData.numbSolarPanel,
            eachPannelPower: formData.eachPannelPower,
            cost: formData.cost
        }
        fetch(`/api/post-time-to-payback/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allData),
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "success"){
                // if auth0 already logged in then just send him to result page
                window.sessionStorage.setItem("collection", "payback");
                history("/Information", {replace: true})
            } else {
                window.alert("Something went wrong ! Please try again")
            }
        })
    };
    // ${usersCo.latitude} ${usersCo.longitude}
    const secondFetch = async (data) => {
        const res = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?limit=1&api_key=Sc8BzcXg593IVrpTDp5gGRL2gxBmj7ICW4Fbprya&lat=40&lon=-105`)
        const res2 = await res.json()
        console.log(res2)
        const res3 = await res2.outputs
        console.log(res3)
            if(res3 !== null){
                thirdFetch(res3.avg_ghi);
                
            }
        
        
    };
    // 3e fetch 
    // 2e fetch call 3e
    
    
    // handleSubmit send the information on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send the choosen info for the calculation
        
        const response = await fetch(`/api/get-co/${id}`)
        const response2 = await response.json();
        console.log(response2)
        if(response2.data !== null){
            await secondFetch(response2);
        }
    }

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }
    return (
        <div>
            <StyledContainer>
                <StyledImgPennies src={savingsPots} alt="Pots of penny" />
                <Form>
                    <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
                    <StyledLabel>Enter Your Details:</StyledLabel>
                    <Input className="input"
                        type="number" 
                        placeholder="Amount paid per KwH"
                        name={"perKiloWattsHour"}
                        required={true}
                        handleChange={handleChange} 
                    />
                    <Input className="input"
                        type="number" 
                        placeholder="Amount of solar panel"
                        name={"numbSolarPanel"}
                        required={true}
                        handleChange={handleChange} 
                    />
                    <Input className="input"
                        type="number" 
                        placeholder="Power of each solar panel in Watts"
                        name={"eachPannelPower"}
                        required={true}
                        handleChange={handleChange} 
                    />
                    <Input className="input"
                        type="number" 
                        placeholder="Cost of the solar pannel system and installation"
                        name={"cost"}
                        required={true}
                        handleChange={handleChange} 
                    />
                    <Submit type="submit">Confirm</Submit>
                </StyledForm>
                </Form>
            </StyledContainer>
            <div>
                <StyledImgSavings src={playingMoney} alt="some pennies on the table" />
            </div>
        </div>
    
    )
    }

    export default PriceCalc;
    
    const StyledContainer = styled.div`
        display: flex;
    `

    const StyledImgPennies = styled.img`
        height: 50vh;
        margin: 60px  20px 0px 150px;
    `

    const StyledImgSavings = styled.img`
        height: 45vh;
        margin: 0px 150px 0px 20px;
        margin-left: 46.3%;
    `
    const Form = styled.div`
        margin: 60px  0px 0px 100px;
    `
    
    const Submit = styled.button`
    background-color: rgba(7, 63, 250, 0.767);
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    
    &:hover {
        cursor: pointer;
        background-color:rgba(7, 63, 250, 0.967);
    }
    `;
    
    const StyledForm = styled.form`
    -webkit-box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
    -moz-box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
    box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
    border: 2px solid black;
    padding: 30px;
    display: flex;
    height: 450px;
    width: 500px;
    border-radius: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    
    .input{
    width: 200px;
    } 
    `;

    const StyledLabel = styled.label`
        font-weight: bold;
    `