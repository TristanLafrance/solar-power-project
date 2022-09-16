import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import {default as Input} from "./IputInformation";
import working from "../assets/jason-goodman-Oalh2MojUuk-unsplash.jpg"
import CEOImg from "../assets/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpg"
import desingBG from "../assets/ricardo-gomez-angel-5YM26lUicfU-unsplash.jpg"

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5637uvo', 'template_ssoi0md', form.current, '3IBWffzWtgvzsxgCu')
        .then((result) => {
            window.alert("Email sent successfuly!")
        }, (error) => {
            window.alert(`The Email was not sent. Please try again. ${error}`)
    });
};

    return (
        <div>
            <StyledBGContainer>
                <StyledImgWork src={working} alt="a meeting" />
                <StyledInfo>
                    <StyledDesignImg src={desingBG} alt="some design background" />
                    <div>
                        <StyledImgCEO src={CEOImg} alt="CEO profile" />
                    </div>
                </StyledInfo>
            </StyledBGContainer>
            <div>
                <Form>
                    <StyledForm ref={form} onSubmit={(e) => sendEmail(e)}>
                        <StyledLabel>Enter Your Details:</StyledLabel>
                            <Input className="input"
                                type="text" 
                                placeholder="First Name"
                                name={"firstName"}
                                required={true}
                            />
                            <Input className="input"
                                type="text" 
                                placeholder="Last Name"
                                name={"lastName"}
                                required={true} 
                            />
                            <Input className="input"
                                type="email" 
                                placeholder="Email"
                                name={"email"}
                                required={true}
                            />
                            <Input className="input"
                                type="text" 
                                placeholder="Message"
                                name={"message"}
                                required={true}
                                />
                    <Submit value="Send" type="submit">Confirm</Submit>
                    </StyledForm>
                </Form>
            </div>
        </div>
)};


export default ContactUs;

const StyledBGContainer = styled.div`
    z-index: -20;
    display: flex;
    position: absolute;
`

const StyledImgWork = styled.img`
    width: 75vw;
    z-index: -1;
`

const StyledInfo = styled.div`
    width: 25vw;
    height: 100vh;
`

const StyledDesignImg = styled.img`
    z-index: -1;
    max-height: 100vh;
    position: absolute;
`

const StyledImgCEO = styled.img`
    max-width: 200px;
    margin: 20% 0px 0px 25%;
    border-radius: 10%;
`

const Form = styled.div`
    display: flex;
    gap: 50px;
    padding: 20px;
    justify-content: flex-start;
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
`



const StyledForm = styled.form`
    z-index: 1;
    position: relative;
    border: 2px solid black;
    margin: 10% 0px 0px 10%;
    padding: 30px;
    display: flex;
    height: 600px;
    width: 500px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: white;
    border-radius: 20px;
`;

const StyledLabel = styled.label`
    font-weight: bold;
    margin-bottom: 30px;
`