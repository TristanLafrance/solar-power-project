import { useState, useRef } from "react";
import {default as Input} from "./InputCalc";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import bgDesign from "../assets/yue-chan-j8bxJBbLjIo-unsplash.jpg"

const Information = () => {
    // Declaring some useState //
    const [ formData, setFormData ] = useState({});
    const [agree, setAgree] = useState(false);

    // Assinging id from sessionStorage
    const id = sessionStorage.getItem("id");

    const history = useNavigate();
    
    const form = useRef(null);

    // Function to send an email using email.JS (last function)
    const sendEmail = (e) => {
        e.preventDefault();
        console.log(form.current)
        console.log(e.target)
        emailjs.sendForm(`${process.env.REACT_APP_Service_Key}`, `${process.env.REACT_APP_Template_Key}`, e.target , `${process.env.REACT_APP_Public_Key}`)
            .then((result) => {
                console.log(result.text);
                if(result.text === "OK"){
                    console.log("ok")
                }
            }, (error) => {
                console.log(error.text);
            });
    };

    // Once trigered it will verify the phone number
    const phoneVerification = async (e) => {
        console.log("Phone verification has been trigger")
        const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_API_Key_Phone}&phone=${formData.phoneNumber}`)
        const res2 = await res.json();
        console.log(res2)
        if(res2 !== null){
            if(res2.valid === true){
                // trigger the last function & redirect them to the result page 
                sendEmail(e)
                history("/Result", {replace: true})
            }else {
                window.alert("We couldn't verify your phone number, please try again !")
            }
        }
    };

    // Once trigered it will verify the email in the form
    const emailVerification = async (e) => {
        console.log("emailfunction has been trigerred")
        const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_API_Key_Email}&email=${formData.email}`)
        const res2 = await res.json();
        if(res2 !== null){
            if(res2.deliverability === "DELIVERABLE"){
                setTimeout(() => {
                    // Triger third function
                    phoneVerification(e);
                }, 2000);
            } else {
                console.log(res2)
                window.alert("We couldn't verify your email, please try again!")
            }
        }
    };

    // Once trigered it will post the form into the data base 
    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        

        const newFormData = {
            firstName: formData.firstName ,
            lastName: formData.lastName ,
            email: formData.email ,
            phoneNumber: formData.phoneNumber,
            termsOfServices: agree
        }
        console.log(newFormData)
        const response = await fetch(`/api/post-info/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        })
        const response2 = await response.json();
        if(response2.data !== null){
            //Triger the second function
            await emailVerification(e);
        } else {
            // redirect to the form info
            history("/Information", {replace: true})
        }
    }

    // Toggle agree useState (false => true, true => false)
    const checkboxHandler = () => {
        setAgree(!agree);
    }

    // Function to send the form to the useState
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }
    return (
        <div>
            <div>
                <StyledImgBg src={bgDesign} alt="Solar panel on a house" />
            </div>
            <StyledContainer>
                <Form>
                    <StyledForm ref={form} onSubmit={(e) => handleSubmit(e, formData)}>
                            <Input className="input"
                                type="text" 
                                placeholder="First Name"
                                name="first_name"
                                required={true}
                                handleChange={handleChange} 
                            />
                            <Input className="input"
                                type="text" 
                                placeholder="Last Name"
                                name="last_name"
                                required={true}
                                handleChange={handleChange} 
                            />
                            <Input className="input"
                                type="email" 
                                placeholder="Email"
                                name="email"
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
                    <Submit value="Send" disabled={!agree} type="submit">Confirm</Submit>
                    </StyledForm>
                </Form>
            </StyledContainer>
        </div>
    
    )
};


export default Information;

const StyledImgBg = styled.img`
    width: 100vw;
    height: 100vh;
    z-index: -10;
    position: absolute;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Form = styled.div`
`


const Submit = styled.button`
    background-color: rgba(7, 63, 250, 0.767);
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    
    &:disabled{
        background-color: grey;
    }

    &:hover {
        cursor: pointer;
    }
    `;

const StyledLabel = styled.label`
    font-weight: bold;
    margin-bottom: 30px;
`

const StyledCheckBox = styled.div`
    display: flex;
`

const CheckBoxInput = styled.input`
    margin-right: 15px;
`
    
const StyledForm = styled.form`
    margin-top: 25%;
    border: 2px solid black;
    border-radius: 20px;
    display: flex;
    height: 600px;
    width: 500px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: white;
    
    
    `;