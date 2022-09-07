import MapPV from "../assets/World_PVOUT_mid-size-map_160x95mm-300dpi_v20191015.jpg"
import styled from "styled-components";

const Map = () => {
    return (
        <StyledContainer>
            <StyledDesc>
                Here is a map showing the potential kWh/kWp output in the world.
            </StyledDesc>
            <StyledImgContainer>
                <StyledImg src={MapPV} alt="World map GHI indice "/>
            </StyledImgContainer>
            <StyledRef>
                For more information please visit <StyledLink href="https://globalsolaratlas.info/">Global Solar Atlas</StyledLink>
            </StyledRef>
        </StyledContainer>
    ) 
    
};


const StyledContainer = styled.div`
    margin-top: 60px;
`

const StyledDesc = styled.div`
    display: flex;
    justify-content: center ;
    margin-top: 100px;
    font-weight: bold;
`

const StyledImgContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center ;
`

const StyledImg = styled.img`
    max-width: fit-content;
    max-height: 700px;
`
const StyledRef = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center ;
`

const StyledLink = styled.a`
    margin-left: 5px;
`
export default Map;