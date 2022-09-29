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

    // Once trigered it will post the form to the data base 
    const thirdFetch =  (data) => {
        
        // Form object sent to the data base 
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
                // Replace to the information page & assign collection to "payback" with sessionStorage
                window.sessionStorage.setItem("collection", "payback");
                history("/Information", {replace: true})
            } else {
                // if error -->
                window.alert("Something went wrong ! Please try again")
            }
        })
    };
    // ${usersCo.latitude} ${usersCo.longitude} <-- would use if the API would be global, but only work for the USA. 
    // Once trigerred it will call the nrel API to get back the annual average GHI 
    const secondFetch = async (data) => {
        const res = await fetch(`https://developer.nrel.gov/api/solar/solar_resource/v1.json?limit=1&api_key=${process.env.REACT_APP_API_Key_GHI}&lat=40&lon=-105`)
        const res2 = await res.json()

        const res3 = await res2.outputs

            if(res3 !== null){
                // Trigger third function
                thirdFetch(res3.avg_ghi);
            } else {
                //if error -->
                window.alert("Something went wrong ! Please try again")
            }
    };
    
    // Function that send the form to the data base
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send the choosen info for the calculation
        
        const response = await fetch(`/api/get-co/${id}`)
        const response2 = await response.json();
        
        if(response2.data !== null){
            // Trigger second function
            await secondFetch(response2);
        } else {
            //if error -->
            window.alert("Something went wrong ! Please try again")
        }
    }

    // Function to send the form information to the useState "formData"
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

    // style-components // 
    
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
        margin-bottom: 20px;
    `