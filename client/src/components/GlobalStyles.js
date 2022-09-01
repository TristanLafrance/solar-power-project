import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --color-white: white;
    }
    *, *::after, *::before, h1:is(h1){
    margin:0;
    padding:0;
    box-sizing: border-box;
}
body {
    padding: 0;
    margin: 0;
    background-color:white;
}

@media only screen and (min-width: 800px){
    .desktop-nav {
        display: block;
    }

    .mobile-nav {
        display: none;
    }
}
@media only screen and(min-width: 801px){
    .desktop-nav {
        display: none;
    }

    .mobile-nav {
        display: block;
    }
}
`;