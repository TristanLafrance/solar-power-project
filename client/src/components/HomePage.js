import solarPannel from "../assets/manny-becerra-NgdhrwAx0J8-unsplash-compressed.jpg"
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const history = useNavigate();

    //Redirect to another page --> Solar-pannel-calculation
    const handleClickOne = () => {
        history("/Solar-pannel-calculation", {replace: true})
    };

    //Redirect to another page --> Price-calculation
    const handleClickTwo = () => {
        history("/Price-calculation", {replace: true})
    };
    return (
            <StyledParent>
                <StyledImgSolarPannel src={solarPannel} alt="Some solar pannels" />
                    <StyledContainer>
                        <QuestionOne>
                            When does it get worth it ?
                            <ButtonOne> Click Here </ButtonOne>
                        </QuestionOne>
                        <QuestionTwo>
                            How much money will I make ?
                            <ButtonTwo> Click Here </ButtonTwo>
                        </QuestionTwo>
                </StyledContainer>
            </StyledParent>
    )
};

export default HomePage;

const StyledParent = styled.div`
`

const StyledImgSolarPannel = styled.img`
    max-width: 99.1vw;
    background-attachment: fixed;
    position: absolute;
    z-index: -100;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
`

const QuestionOne = styled.p`
    color: white;
    height: 450px;
    width: 400px;
    border-radius: 15px;
    background-color: rgb(0,0,0,0.5);
    box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -webkit-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
`
const QuestionTwo = styled.p`
    color: white;
    height: 450px;
    width: 400px;
    border-radius: 15px;
    background-color: rgb(0,0,0,0.5);
    box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -webkit-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.61);
    -moz-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
`
const ButtonOne = styled.button`
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

const ButtonTwo = styled.button`
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