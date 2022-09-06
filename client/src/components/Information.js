import { useState } from "react";
import {default as Input} from "./InputCalc";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Information = () => {
    const [ formData, setFormData ] = useState({});
    const [agree, setAgree] = useState(false);
    const id = sessionStorage.getItem("id");
    const history = useNavigate();

    const phoneVerification = async () => {
        console.log("Phone verification has been trigger")
        const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=f77522d8a2f8491683d7453cfcd4ea4a&phone=${formData.phoneNumber}`)
        const res2 = await res.json();
        console.log(res2)
        if(res2 !== null){
            if(res2.valid === true){
                history("/Result", {replace: true})
            }else {
                window.alert("We couldn't verify your phone number, please try again !")
            }
        }
    };

    const emailVerification = async () => {
        console.log("emailfunction has been trigerred")
        const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=7fe0460151d649bdbef887e0b363fa3f&email=${formData.email}`)
        const res2 = await res.json();
        if(res2 !== null){
            if(res2.deliverability === "DELIVERABLE"){
                setTimeout(() => {
                    phoneVerification();
                }, 2000);
            } else {
                window.alert("We couldn't verify your email, please try again!")
            }
        }
    };
    

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        

        const newFormData = {
            firstName: formData.firstName ,
            lastName: formData.lastName ,
            email: formData.email ,
            phoneNumber: formData.phoneNumber,
            termsOfServices: agree
        }

        const response = await fetch(`/api/post-info/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        })
        const response2 = await response.json();
        if(response2.data !== null){
            console.log("await emailVerification trigerred")
            await emailVerification();
        } else {
            // redirect to the form info
            history("/Information", {replace: true})
        }
    }

    // Toggle agree useState (false => true, true => false)
    const checkboxHandler = () => {
        setAgree(!agree);
    }

    
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
                            type="text" 
                            placeholder="First Name"
                            name={"firstName"}
                            required={true}
                            handleChange={handleChange} 
                        />
                        <Input className="input"
                            type="text" 
                            placeholder="Last Name"
                            name={"lastName"}
                            required={true}
                            handleChange={handleChange} 
                        />
                        <Input className="input"
                            type="email" 
                            placeholder="Email"
                            name={"email"}
                            required={true}
                            handleChange={handleChange} 
                        />
                        <Input className="input"
                            type="text" 
                            placeholder="Phone Number"
                            name={"phoneNumber"}
                            required={true}
                            handleChange={handleChange} 
                        />
                <StyledCheckBox>
                    <CheckBoxInput className="input" type="checkbox"  onChange={checkboxHandler} />
                    <div>
                        I agree to the <Link to={"/Terms-of-Service"}> terms of services </Link>
                    </div>
                </StyledCheckBox>
                <Submit disabled={!agree} type="submit">Confirm</Submit>
                </StyledForm>
            </Form>
            </div>
        </div>
    
    )
};


export default Information;

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
    `

    const StyledCheckBox = styled.div`
        display: flex;
    `

    const CheckBoxInput = styled.input`
        margin-right: 15px;
    `
    
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
    
    
    
    `;