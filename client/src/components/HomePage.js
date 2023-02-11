import solarPannel from "../assets/manny-becerra-NgdhrwAx0J8-unsplash-compressed.jpg"
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const history = useNavigate();

    //Redirect to another page --> Price-calculation
    const handleClickOne = () => {
        history("/Price-calculation", {replace: true})
    };

    //Redirect to another page --> Solar-pannel-calculation
    const handleClickTwo = () => {
        history("/Solar-pannel-calculation", {replace: true})
    };
    return (
            <StyledParent>
                <StyledImgSolarPannel src={solarPannel} alt="Some solar pannels" />
                    <StyledContainer>
                        {/* First Container */}
                        <QuestionOne>
                            <QuestionOneHeader>
                                When does it get worth it ?
                            </QuestionOneHeader>
                            <SubQuestionOne> You will know: </SubQuestionOne>
                            <StyledULQuestionOne>
                                <StyledLiQuestion>
                                    How much time it will take to refund it
                                </StyledLiQuestion>
                                <StyledLiQuestion>
                                    How much money you will make 
                                </StyledLiQuestion>
                                <StyledLiQuestion>
                                    How much power you will produce
                                </StyledLiQuestion>
                            </StyledULQuestionOne>
                            {/* First button, onClick redirect to /Solar-pannel-calculation */}
                            <ButtonOne onClick={handleClickOne}> Click Here </ButtonOne>
                        </QuestionOne>
                        {/* Second Container */}
                        <QuestionTwo>
                            <QuestionTwoHeader>
                                How much money will I make ?
                            </QuestionTwoHeader>
                            <SubQuestionTwo> You will know: </SubQuestionTwo>
                            <StyledULQuestionTwo>
                                <StyledLiQuestion>
                                    How much money you will make 
                                </StyledLiQuestion>
                                <StyledLiQuestion>
                                    How much power you will produce
                                </StyledLiQuestion>
                            </StyledULQuestionTwo>
                            {/* Second button, onClick redirect to /Price-calculation */}
                            <ButtonTwo onClick={handleClickTwo}> Click Here </ButtonTwo>
                        </QuestionTwo>
                </StyledContainer>
            </StyledParent>
    )
};

export default HomePage;

/* Styled components */

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

const QuestionOne = styled.div`
    color: white;
    height: 450px;
    width: 400px;
    border-radius: 15px;
    background-color: rgb(0,0,0,0.5);
    box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -webkit-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
`

const QuestionOneHeader = styled.h2`
    font-weight: bold;
    margin: 20px 0px 10px 50px;
`

const SubQuestionOne = styled.div`
    margin: 20px 0px 0px 20px;
`

const StyledULQuestionOne = styled.ul`
    margin-top: 20px;
`

const StyledLiQuestion = styled.li`
    margin: 10px 0px 10px 75px ;
    list-style: none;
    font-size: 17px;
`

const QuestionTwo = styled.div`
    color: white;
    height: 450px;
    width: 400px;
    border-radius: 15px;
    background-color: rgb(0,0,0,0.5);
    box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
    -webkit-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.61);
    -moz-box-shadow: 3px 9px 20px 1px rgba(0,0,0,0.5);
`

const QuestionTwoHeader = styled.h2`
    font-weight: bold;
    margin: 20px 0px 10px 40px;
`

const SubQuestionTwo = styled.div`
    margin: 20px 0px 0px 20px;
`

const StyledULQuestionTwo = styled.ul`
    margin-top: 20px;
`

const ButtonOne = styled.button`
    color: white;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(57, 196, 255);
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    margin: 100px 0px 0px 125px;

    &:hover {
        cursor: pointer;
        background-color:rgba(57, 196, 255, 0.8);
    }
`

const ButtonTwo = styled.button`
    color: white;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(57, 196, 255);
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    padding: 10px 30px 10px 30px;
    margin: 135px 0px 0px 125px;

    &:hover {
        cursor: pointer;
        background-color:rgba(57, 196, 255, 0.8);
    }
`