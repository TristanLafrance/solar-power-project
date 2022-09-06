import {  useState } from "react";
import styled from "styled-components";
import {default as Input} from "./InputCalc";
import { useNavigate } from "react-router-dom";

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
        <Form>
            <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <label>Enter Your Details:</label>
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



const Form = styled.div`
display: flex;
gap: 50px;
padding: 20px;
`

const Submit = styled.button`
background-color: #d1560e;
border: none;
margin-top: 5px;
border-radius: 5px;
padding: 10px;

&:hover {
    cursor: pointer;
}
`;

const StyledForm = styled.form`
-webkit-box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
-moz-box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
box-shadow: 10px 10px 5px 0px rgba(217,213,217,1);
border: 3px solid black;
padding: 30px;
display: flex;
height: 400px;
width: 500px;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;


.input{
width: 200px;


} 
`;

