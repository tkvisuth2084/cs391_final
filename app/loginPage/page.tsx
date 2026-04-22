'use client'
import styled from 'styled-components'
import { useState} from 'react';

const StyledPage = styled.main`
    min-height: 100vh;
    background-color: #dfd6d6;`
const StyledCard = styled.div`
    background-color: #fdfdfd;
    border-radius: 15px;
    width: 30%;
    height: 70%;
    align-items: center;
    justify-content: center;;
    margin: 0 auto;
    padding: 30px;
    margin-top: 50px;


`
const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    
`
const StyledHeader = styled.h1`
font-size: 18px;
    margin-bottom: 15px;
`
const StyledText = styled.p`
font-size: 18px;
    font-family:"Calibri Light";
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
            <button onClick={() => setEmail('')}>Sign in</button>


        </StyledCard>
    </StyledPage>
    )
}