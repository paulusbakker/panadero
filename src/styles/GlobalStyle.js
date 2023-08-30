import { createGlobalStyle } from "styled-components";
import FredokaOneWoff from '../fonts/FredokaOneWoff'
import FredokaOneWoff2 from '../fonts/FredokaOneWoff2'
export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Fredoka One';
    src: local('Fredoka One'), local('FredokaOne'),
    url(${FredokaOneWoff2}) format('woff2'),
    url(${FredokaOneWoff}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    line-height: 1.5;
    text-decoration: none;  
    -webkit-tap-highlight-color: rgba(0,0,0,0); // prevents recipes of ingredients from highlighting when pressed on mobile browsers
  }

  body {
    background-color: lightgrey;
 
  }
 
`;
