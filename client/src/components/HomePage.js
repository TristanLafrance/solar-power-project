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
                <StyledSquare>
                        <div>
                            When does it get worth it ?
                        </div>
                        <div>
                            How much money will I make ?
                        </div>
                </StyledSquare>
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

const StyledSquare = styled.div`
`
