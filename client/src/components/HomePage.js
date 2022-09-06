import housePannel from "../assets/vivint-solar-HASgVRE48KY-unsplash.jpg"
import solarPannel from "../assets/manny-becerra-NgdhrwAx0J8-unsplash-compressed.jpg"
import savings from "../assets/nathan-dumlao-mZZ0ls7X9tc-unsplash.jpg"
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const history = useNavigate();

    const handleClickOne = () => {
        history("/Solar-pannel-calculation", {replace: true})

    };

    const handleClickTwo = () => {
        history("/Price-calculation", {replace: true})
    };
    return (
        <StyledParent>
            <div>
                <StyledImgSolarPannel src={solarPannel} alt="Some solar pannels" />    
            </div>
            <StyledContainer>
                <StyledSquareOne>
                    <StyledImgHouse src={housePannel} alt="solar pannel on a house" />
                    <StyledInfoOne>
                        How much electricity/money does your solar pannel produce ?
                    </StyledInfoOne>
                    <div>
                        <StyledKnow>
                            You will know:
                        </StyledKnow>
                        <StyledUl>
                            <StyledLi>
                                The power output per day/year
                            </StyledLi>
                            <StyledLi>
                                The money saved per day/year
                            </StyledLi>
                        </StyledUl>
                    </div>
                    <StyledButtonOne onClick={handleClickOne}>
                        Click Here
                    </StyledButtonOne>
                </StyledSquareOne>
                <StyledSquareTwo>
                    <StyledImgSavings src={savings} alt="money in a pot with a plant" />
                    <StyledInfoTwo>
                        How much time to payback your solar pannel ?
                    </StyledInfoTwo>
                    <div>
                        <StyledKnow>
                            You will know:
                        </StyledKnow>
                        <StyledUl>
                            <StyledLi>
                                The power output per day/year
                            </StyledLi>
                            <StyledLi>
                                The money saved per day/year
                            </StyledLi>
                            <StyledLi>
                                Time to payback in days/years
                            </StyledLi>
                        </StyledUl>
                    </div>
                    <StyledButtonTwo onClick={handleClickTwo}>
                        Click Here
                    </StyledButtonTwo>
                </StyledSquareTwo>
            </StyledContainer>
        </StyledParent>

    )
};

export default HomePage;

const StyledParent = styled.div`
`

const StyledImgSolarPannel = styled.img`
    max-width: 100vw;
    position: absolute;
    z-index: -100;
`

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 200px;
`

const StyledSquareOne = styled.div`
    height: 600px;
    width: 400px;
    margin-top: 12%;
`

const StyledInfoOne = styled.div`
    font-weight: bold;
    margin: 30px 0px 0px 20px;
`

const StyledImgHouse = styled.img`
    position: absolute;
    z-index: -1;
    height: 600px;
    border-radius: 10%;
    -webkit-box-shadow: 4px 6px 12px 0px rgba(50, 50, 50, 0.72);
    -moz-box-shadow:    4px 6px 12px 0px rgba(50, 50, 50, 0.72);
    box-shadow:         4px 6px 12px 0px rgba(50, 50, 50, 0.72);
`

const StyledKnow = styled.div`
    margin: 30px 0px 0px 15px;
`

const StyledUl = styled.ul`
    list-style: none;
    margin: 20px 0px 0px 40px;
`

const StyledLi = styled.li`
    margin-top: 20px;
`

const StyledButtonOne = styled.button`
    margin: 80% 0px 0px 25%;
    width: 200px;
    height: 50px;
    border-radius: 15px;
    border: none;
    font-size: 17px;
    font-weight: larger;
    background-color: rgba(255, 255, 255, 0.47);

    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }
`

const StyledSquareTwo = styled.div`
    height: 600px;
    margin-top: 12%;
    color: white;
`

const StyledInfoTwo = styled.div`
    font-weight: bold;
    margin: 30px 0px 0px 40px;
`

const StyledImgSavings = styled.img`
    position: absolute;
    z-index: -1;
    height: 600px;
    width: 400px;
    border-radius: 10%;
    -webkit-box-shadow: 4px 6px 12px 0px rgba(50, 50, 50, 0.72);
    -moz-box-shadow:    4px 6px 12px 0px rgba(50, 50, 50, 0.72);
    box-shadow:         4px 6px 12px 0px rgba(50, 50, 50, 0.72);
`

const StyledButtonTwo = styled.button`
    margin: 75% 0px 0px 25%;
    width: 200px;
    height: 50px;
    border-radius: 15px;
    border: none;
    font-size: 17px;
    font-weight: larger;
    background-color: rgba(255, 255, 255, 0.47);

    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }
`
