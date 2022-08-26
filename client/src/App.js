import{ BrowserRouter, Routes, Route, NavLink}from "react-router-dom";
import HomePage from "./components/HomePage"; 
import About from "./components/About";
import Information from "./components/Inofrmation";
import Map from "./components/Map"
import OurGoals from "./components/OurGoals"
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import { GiHamburgerMenu } from "react-icons/gi"

const App = () => {
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
                                    <StyledNavLink to="/About-us"> About us </StyledNavLink>
                                </StyledLi>
                                <StyledLi>
                                    <StyledNavLink to="/Our-goals"> Our Goals </StyledNavLink>
                                </StyledLi>
                            </StyledUl>
                        </StyledNavDesk>
                        <nav className="mobile-nav">
                        <StyledButton className="mobile-nav-button" aria-label="Show menu">
                            <GiHamburgerMenu />
                        </StyledButton>
                    </nav>
                </StyledHeader>
            </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Map" element={<Map />} />
                    <Route path="/About-us" element={<About />} />
                    <Route path="/Our-goals" element={<OurGoals />} />
                    <Route path="/Information" element={<Information />} />
                </Routes>
            </ParentDiv>
        </BrowserRouter>
    );
};

// Styled Components //

const ParentDiv = styled.div`

`   

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
`

const StyledH1 = styled.h1`
    color: black;
`

const StyledNavDesk = styled.nav`
    display: none;
`

const StyledUl = styled.ul`
    display: flex;
    gap: 75px;
    font-weight: bold;
    font-size: 18px;
`

const StyledLi = styled.li`
    list-style: none;
`

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
`

const StyledButton = styled.button`
    width: 18px;
`
export default App;