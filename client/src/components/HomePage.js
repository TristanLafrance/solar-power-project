import solarPannel from "../assets/manny-becerra-NgdhrwAx0J8-unsplash-compressed.jpg"
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
        <div>
            <div>
            <StyledImg src={solarPannel} alt="Some solar pannels" />    
            </div>
            <StyledContainer>
                <StyledSquareOne>
                    <StyledInfoOne>
                        How much electricity/money does your solar pannel produce ?
                    </StyledInfoOne>
                    <StyledButtonOne onClick={handleClickOne}>
                        Click Here
                    </StyledButtonOne>
                </StyledSquareOne>
                <StyledSquareTwo>
                    <StyledInfoTwo>
                        How much electricity and money would you save with solar pannel ?
                    </StyledInfoTwo>
                    <StyledButtonTwo onClick={handleClickTwo}>
                        Click Here
                    </StyledButtonTwo>
                </StyledSquareTwo>
            </StyledContainer>
        </div>

    )
};

export default HomePage;

const StyledImg = styled.img`
    max-width: 100vw;
    z-index: 1000;
`

const StyledContainer = styled.div`

`

const StyledSquareOne = styled.div`

`

const StyledInfoOne = styled.div`

`

const StyledButtonOne = styled.button`

`

const StyledSquareTwo = styled.div`

`

const StyledInfoTwo = styled.div`

`

const StyledButtonTwo = styled.button`

`
