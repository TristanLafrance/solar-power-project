import {  useState } from "react";
import styled from "styled-components";
import {default as Input} from "./InputCalc";
import { useNavigate } from "react-router-dom";
import designBG from "../assets/sungrow-emea-itv-MC5S6cU-unsplash.jpg"


const SolarPanelCalc = () => {
const history = useNavigate();

const [formData, setFormData] = useState({});
const id = sessionStorage.getItem("id");

const thirdFetch =  (data) => {
    console.log(data)
    const allData = {
        kWPerSquareMeter: data.annual,
        perKiloWattsHour: formData.perKiloWattsHour,
        numbSolarPanel: formData.numbSolarPanel,
        eachPannelPower: formData.eachPannelPower
    }
    fetch(`/api/post-calc-info/${id}`, {
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
            window.sessionStorage.setItem("collection", "yourPannel");
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

// handleChange to pass up the information
const handleChange = (key, value) => {
    setFormData({
        ...formData,
        [key]: value
    })
}
return (
    <div>
        <div>
            <div>
                <StyledImgDesign src={designBG} alt="Some design background"/>
            </div>
        <Form>
            <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <StyledLabel>Enter Your Details:</StyledLabel>
            <Input className="input"
                type="number" 
                placeholder="Amount Paid in $/kWh"
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
            <Submit type="submit">Confirm</Submit>
        </StyledForm>
        </Form>
        </div>
    </div>

)
}


export default SolarPanelCalc;


const StyledImgDesign = styled.img`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -10;
`

const Form = styled.div`
    display: flex;
    gap: 50px;
    padding: 20px;
`

const StyledLabel = styled.label`
    font-weight: bold;
    margin-bottom: 30px;
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
    margin: 150px 0px 0px 35%;
    border: 2px solid black;
    display: flex;
    height: 600px;
    width: 500px;
    border-radius: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: white;
    
    .input{
    width: 200px;


    } 
`;

