import{ BrowserRouter, Routes, Route, NavLink}from "react-router-dom";
import HomePage from "./components/HomePage"; 
import Information from "./components/Information";
import Map from "./components/Map"
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import { useEffect, useState } from "react";
import SolarPanelCalc from "./components/SolarPanelCalc";
import PriceCalc from "./components/PriceCalc";
import Result from "./components/Result";
import ContactUs from "./components/ContactUs";

const App = () => {
    const [ usersInfo, setUsersInfo ] = useState(null);

    useEffect(() => {
        fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=d65bda1b27e444d4b36764fafbc5587b`)
        .then(res => res.json())
        .then(data => setUsersInfo(data))
    }, [])
    console.log(usersInfo) 
    
        useEffect(() => {
            if(usersInfo !== null){
                fetch("/api/post-user", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usersInfo),
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.message === "success" ){
                            window.sessionStorage.setItem("id", data.data)
                            console.log("sucess")
                        } else {
                            window.sessionStorage.setItem("id", null)
                        }
                    })
            } else if(usersInfo === null){
                console.log("not ready") 
            }
        }, [usersInfo])
    return (
        <BrowserRouter>
            <GlobalStyles />
                <ParentDiv>
                <div className="container">
                    <StyledHeader>
                        <StyledH1>
                            <StyledNavLink to="/">
                                Solar Power Project
                            </StyledNavLink>
                        </StyledH1>
                        <StyledNavDesk className="desktop-nav">
                            <StyledUl>
                                <StyledLi>
                                    <StyledNavLink to="/Map"> Map </StyledNavLink>
                                </StyledLi>
                                <StyledLi>
                                    <StyledNavLink to="/Contact-us"> Contact us </StyledNavLink>
                                </StyledLi>
                            </StyledUl>
                        </StyledNavDesk>
                    </StyledHeader>
                </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Map" element={<Map />} />
                    <Route path="/Contact-us" element={<ContactUs />} />
                    <Route path="/Information" element={<Information />} />
                    <Route path='/Solar-pannel-calculation' element={<SolarPanelCalc />} />
                    <Route path='/Price-calculation' element={<PriceCalc />} />
                    <Route path="/Result" element={<Result />} />
                </Routes>
            </ParentDiv>
        </BrowserRouter>
    );
};

// Styled Components //

const ParentDiv = styled.div`
    z-index: 2;
`   

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    position:fixed;
    left:0;
    top:0;
`

const StyledH1 = styled.h1`
    color: black;
    min-width: fit-content;
`

const StyledNavDesk = styled.nav`
`

const StyledUl = styled.ul`
    display: flex;
    gap: 75px;
    font-weight: bold;
    font-size: 18px;
    margin-left: 75%;
`

const StyledLi = styled.li`
    list-style: none;
    min-width: 200px;
`


const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: rgba(0, 0, 0, 0.644);
    transition: color 2s;
    &:hover, &:active, &:focus {
    color: black;
}
`


export default App;