import {  useState } from "react";
import styled from "styled-components";
import {default as Input} from "./InputCalc";
import { useNavigate } from "react-router-dom";
import designBG from "../assets/sungrow-emea-itv-MC5S6cU-unsplash.jpg"


const SolarPanelCalc = () => {
const history = useNavigate();

const [formData, setFormData] = useState({});
const id = sessionStorage.getItem("id");

// Once trigered it will post the form to the data base 
const thirdFetch =  (data) => {

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
            // Replace to the information page & assign collection to "payback" with sessionStorage
            window.sessionStorage.setItem("collection", "yourPannel");
            history("/Information", {replace: true})
        } else {
            //if error -->
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
};

//  Function to send the form information to the useState "formData"
const handleChange = (key, value) => {
    setFormData({
        ...formData,
        [key]: value
    })
};

return (
    <div>
        {/* Background image */}
        <div>
            <div>
                <StyledImgDesign src={designBG} alt="Some design background"/>
            </div>
            {/* Form */}
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
            {/* onClick, it will trigger the function handleSubmit */}
            <Submit type="submit">Confirm</Submit>
        </StyledForm>
        </Form>
        </div>
    </div>

)
}


export default SolarPanelCalc;

/* Styled-components */

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

