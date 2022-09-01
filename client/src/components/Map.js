import { useEffect, useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import styled from "styled-components";

const Test = () => {
    const [usersCo, setUsersCo] = useState(null)
    const id = sessionStorage.getItem("id")
    console.log(id)

    useEffect(() => {
        fetch(`/api/get-co/${id}`)
        .then(res => res.json())
        .then(data => {
            setUsersCo(data)
            console.log(data) 
        }
        
    )
    }, [])
    
    if(usersCo !== null){
        return (
            <GoogleMap defaultZoom={7} 
                defaultCenter={{lat: usersCo.data.latitude, lng: usersCo.data.longitude }}
                />
        )
    } else if(usersCo === null){
        return (
            <div>
                Loading...
            </div>
        )
    }
}
const WrappedMap = withScriptjs(withGoogleMap(Test))

const Map = () => {
    return (
        <StyledContainer style={{width: '80vw', height: '80vh'}}>
            < WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDpXXBGO2mD0x2hv31lODxdOseFw1NP9xA`}
            loadingElement={<div style={{height: "100%"}} />}
            containerElement={<div style={{height: "100%"}} />}
            mapElement={<div style={{height: "100%"}} />}
                />
        </StyledContainer>
    ) 
    
};


const StyledContainer = styled.div`
    margin-top: 40px;
`


export default Map;