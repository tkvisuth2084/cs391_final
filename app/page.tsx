import Image from "next/image";

import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
`
const StyledSecondPart = styled.div`
padding: 30px;
    margin-bottom: 30px;
`
const StyledButton = styled(Link)`
background-color: white;
    color:black;
    padding: 10px 4px;
    border-radius: 9px;
    align-items: center;
    margin-left:2%;
    font-size:100%;
    text-align:center;
    font-weight: bold;
    display: flex;
    justify-content: center;



    &:hover {
        background-color: #ffa703;
        color: white;
    }
    width: 20vh;
    height: 10vh;



`
const StyledContext = styled.div`
    font-family: Calibri;
    color: black;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    text-shadow: 2px 2px 2px #ffffff;
    margin-top: 5%;
    

    
`
const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-top: 4%;
`
const StyledWrapper = styled.div`
background-color: #ffedce;
display: flex;
justify-content: center;
    flex-direction: column;
`
const StyledContainer = styled.div`
    background-image: url("/cute_dog.jpg");
    height: 100vh;
    width: 100%;
    display:flex;
    background-size: cover;
    align-items: center;
    justify-content: center;;
    margin: 0 auto;
    max-width: 1200px;
    flex-direction: column;


`
const StyledP = styled.p`
    font-size: 3rem;
    margin-top: 8%;
    font-family: Calibri;
    margin-left: 20px;
    font-weight: bold;
    text-shadow: 2px 2px 3px #ffa703;
    color: #000000;

`
export default function Home() {
  return (

      <StyledWrapper>
        <StyledContainer>

          <StyledP>Find your new Best friend!</StyledP>


            <StyledButtonContainer>
            <StyledButton href="/pawSwipe">Get Matched!</StyledButton>
            <StyledButton href="/pawFinder">Unsure about a pet?</StyledButton>
            </StyledButtonContainer>
        </StyledContainer>
          <StyledSecondPart>
          <StyledContext>Pawfinder is your gateway for finding a nearby pet nearby you! With over 3 million users, we have matched dogs, cats, and even horses to loving homes! Join our community and find your new companion</StyledContext>
          </StyledSecondPart>
          <StyledFooter><StyledContext>All rights reserved </StyledContext></StyledFooter>
     </StyledWrapper>

  );
}
