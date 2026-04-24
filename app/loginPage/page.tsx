'use client'
import styled from 'styled-components'
import { useState } from 'react';

const StyledPage = styled.main`
    min-height: 100vh;
    background-color: #ffedce;
`
const ErrorMsg = styled.p`
    font-size: 13px;
    color: #c43a00;
    background: #fff0ec;
    border: 1px solid #ffb899;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
`
const StyledCard = styled.div`
    background-color: #fdfdfd;
    border-radius: 15px;
    width: 30%;
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
    cursor: pointer;
`
const StyledSwitch = styled.button`
    background: none;
    border: none;
    color: #ff5d00;
    font-size: 13px;
    cursor: pointer;
    margin-top: 16px;
    display: block;
    width: 100%;
    text-align: center;
`

export default function LoginPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const[error, setError] = useState('')

    async function handleLogin() {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.error || "Sign up failed")
            return
        }
        setError('')
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }))
        window.location.href = `/profile?email=${data.email}`

    }

    async function handleSignUp() {
        if (password !== confirmPassword){
            setError('Passwords do not match')
        return
        }
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json()
        if (!res.ok) {
            setError(data.error)
            return}

        console.log('Account created!')
        setIsLogin(true)
    }

    return (
        <StyledPage>
            <StyledCard>
                <StyledHeader>{isLogin ? 'Welcome Back' : 'Create Account'}</StyledHeader>
                <StyledText>
                    {isLogin ? 'Sign in to continue your adoption journey' : 'Join us today'}
                </StyledText>

                {!isLogin && (
                    <>
                        <StyledHeader>Name</StyledHeader>
                        <StyledInput
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                    </>
                )}

                <StyledHeader>Email</StyledHeader>
                <StyledInput
                    type="email"
                    placeholder="enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <StyledHeader>Password</StyledHeader>
                <StyledInput
                    type="password"
                    placeholder="enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <>
                        <StyledHeader>Confirm Password</StyledHeader>
                        <StyledInput
                            type="password"
                            placeholder="confirm your password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </>
                )}


                <StyledButton onClick={isLogin ? handleLogin : handleSignUp}>
                    {isLogin ? 'Sign in' : 'Create Account'}
                </StyledButton>
                {error && <ErrorMsg>{error}</ErrorMsg>}

                <StyledSwitch onClick={() => setIsLogin(p => !p)}>
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </StyledSwitch>

            </StyledCard>
        </StyledPage>
    )
}