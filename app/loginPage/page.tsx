'use client'
import styled from 'styled-components'
import { useState} from 'react';

const StyledPage = styled.main`
    min-height: 100vh;
    background-color: #ffedce;`
const StyledCard = styled.div`
    background-color: #fdfdfd;
    border-radius: 15px;
    width: 30%;

    align-items: center;
    justify-content: center;;
    margin: 0 auto;
    padding: 30px;
    margin-top: 50px;
    height: 80vh;


`
const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 15px;
    
`
const StyledHeader = styled.h1`
font-size: 18px;
    margin-bottom: 15px;
`
const StyledText = styled.p`
font-size: 18px;
    font-family:"Calibri Light";
    margin-bottom: 20px;
    
`
const StyledButton = styled.button`
    width: 100%;
    padding: 10px 14px;
    background-color: #ff5d00;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
`
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    function handleLogin(){
        console.log(password)

    }
    function handleSignUp(){
        console.log({name, email, password})
    }
    return (
    <StyledPage>
        <StyledCard>
            <StyledHeader>Welcome Back</StyledHeader>
            <StyledText>Sign in to continue your adoption journey</StyledText>
            <StyledHeader>Email</StyledHeader>
            <StyledInput onChange={e => setEmail(e.target.value)} value={email} />
            <StyledHeader>Password</StyledHeader>
            <StyledInput onChange={e => setPassword(e.target.value)} value={password} />
            <StyledButton onClick={() => setEmail('')}>Sign in</StyledButton>


        </StyledCard>
    </StyledPage>
    )
}