import { useState, useRef } from "react";
import {default as Input} from "./InputCalc";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import bgDesign from "../assets/yue-chan-j8bxJBbLjIo-unsplash.jpg"

const Information = () => {
    const [ formData, setFormData ] = useState({});
    const [agree, setAgree] = useState(false);
    const id = sessionStorage.getItem("id");
    const history = useNavigate();
    let formE
    console.log(formE)
    const form = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(form.current)
        console.log(e.target)
        emailjs.sendForm('service_5637uvo', 'template_ssoi0md', e.target , '3IBWffzWtgvzsxgCu')
            .then((result) => {
                console.log(result.text);
                if(result.text === "OK"){
                    console.log("ok")
                }
            }, (error) => {
                console.log(error.text);
            });
    };

    const phoneVerification = async (e) => {
        console.log("Phone verification has been trigger")
        const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=f77522d8a2f8491683d7453cfcd4ea4a&phone=${formData.phoneNumber}`)
        const res2 = await res.json();
        console.log(res2)
        if(res2 !== null){
            if(res2.valid === true){
                sendEmail(e)
                history("/Result", {replace: true})
            }else {
                window.alert("We couldn't verify your phone number, please try again !")
            }
        }
    };

    // const emailVerification = async (e) => {
    //     console.log("emailfunction has been trigerred")
    //     const res = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=7fe0460151d649bdbef887e0b363fa3f&email=${formData.email}`)
    //     const res2 = await res.json();
    //     if(res2 !== null){
    //         if(res2.deliverability === "DELIVERABLE"){
    //             setTimeout(() => {
    //                 phoneVerification(e);
    //             }, 2000);
    //         } else {
    //             console.log(res2)
    //             window.alert("We couldn't verify your email, please try again!")
    //         }
    //     }
    // };

    const handleSubmit = async (e, formData) => {
        e.preventDefault();
        
        formE = e
        console.log(formE)
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
            console.log("await emailVerification trigerred")
            await phoneVerification(e);
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
                <StyledImgBg src={bgDesign} alt="Solar panel on a house" />
            </div>
            <StyledContainer>
                <Form>
                    <StyledForm ref={form} onSubmit={(e) => handleSubmit(e, formData)}>
                        {/* <StyledLabel htmlFor="firstName">Enter Your Details:</StyledLabel> */}
                            <Input className="input"
                                type="text" 
                                placeholder="First Name"
                                name="first_name"
                                required={true}
                                handleChange={handleChange} 
                            />
                            {/* <StyledLabel htmlFor="lastName">Enter Your Details:</StyledLabel> */}
                            <Input className="input"
                                type="text" 
                                placeholder="Last Name"
                                name="last_name"
                                required={true}
                                handleChange={handleChange} 
                            />
                            {/* <StyledLabel htmlFor="email">Enter Your Details:</StyledLabel> */}
                            <Input className="input"
                                type="email" 
                                placeholder="Email"
                                name="email"
                                required={true}
                                handleChange={handleChange} 
                            />
                            {/* <StyledLabel htmlFor="phoneNumber">Enter Your Details:</StyledLabel> */}
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