import Link from "next/link";
import styled from "styled-components";

const StyledDiv = styled.header`
    padding: 8px;
    background-color: #ee9006;
`;
const StyledHeader = styled.h1`
    font-family: Calibri;
    color: #ffffff;
    font-weight: 800;
`


const StyledNav = styled.nav`
  padding: 2px;
  margin: 10px;
    text-align: center;
    
`;

const StyledLink = styled(Link)`
    padding: 4px;
    margin: 8px;
    font-size: 1.25rem;
    font-family: Arial;
    font-weight: bold;
    text-decoration: none;
    color: #605f5f;

    &:hover {
        text-decoration: underline;
    }
`;

export default function Header() {
    return (
        <StyledDiv>
            <StyledHeader>PawFinder🐾</StyledHeader>
            <StyledNav>
                <StyledLink href="/">Home</StyledLink>
                <StyledLink href="/loginPage">Login</StyledLink>
                <StyledLink href="/pawSwipe">Paw Swipe</StyledLink>
                <StyledLink href="/pawFinder">Paw Finder</StyledLink>
            </StyledNav>
        </StyledDiv>
    );
}