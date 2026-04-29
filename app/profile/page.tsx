'use client'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


const StyledPage = styled.main`
    min-height: 100vh;
    background-color: #ffedce;
    padding: 50px 20px;
`

const StyledCard = styled.div`
    background-color: #fdfdfd;
    border-radius: 15px;
    width: 50%;
    margin: 0 auto;
    padding: 40px;
 
    @media (max-width: 768px) {
        width: 90%;
    }
`

const AvatarSection = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #f0e0cc;
`

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ff5d00;
`

const AvatarFallback = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ff5d00;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
`

const AvatarInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const UserName = styled.h2`
    font-size: 22px;
    font-weight: 700;
    color: #1a0f00;
    margin: 0;
`

const UserEmail = styled.p`
    font-size: 14px;
    color: #888;
    margin: 0;
`

const SectionTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #ff5d00;
    margin-bottom: 16px;
`

const StyledLabel = styled.label`
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #444;
    margin-bottom: 5px;
`

const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: 10px 14px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 15px;
    box-sizing: border-box;
    background: #fff7f0;
    outline: none;
    &:focus {
        border-color: #ff5d00;
        box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.1);
    }
`

const StyledTextarea = styled.textarea`
    display: block;
    width: 100%;
    padding: 10px 14px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 15px;
    box-sizing: border-box;
    background: #fff7f0;
    outline: none;
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
    &:focus {
        border-color: #ff5d00;
        box-shadow: 0 0 0 3px rgba(255, 93, 0, 0.1);
    }
`

const ButtonRow = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`

const StyledButton = styled.button`
    flex: 1;
    padding: 11px;
    background-color: #ff5d00;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #e05300;
    }
`

const CancelButton = styled.button`
    flex: 1;
    padding: 11px;
    background-color: transparent;
    color: #ff5d00;
    border: 1.5px solid #ff5d00;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fff0e6;
    }
`

const SuccessMsg = styled.p`
    font-size: 13px;
    color: #2e7d32;
    background: #f0faf0;
    border: 1px solid #a5d6a7;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
`

const EditLink = styled.button`
    background: none;
    border: none;
    color: #ff5d00;
    font-size: 13px;
    cursor: pointer;
    padding: 0;
    margin-top: 4px;
    text-decoration: underline;
`

export default function ProfilePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [editing, setEditing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [tempName, setTempName] = useState('')
    const [tempBio, setTempBio] = useState('')
    const [tempAvatar, setTempAvatar] = useState('')

    const searchParams = useSearchParams()

    useEffect(() => {
        const email = searchParams.get('email')
        if (!email) return

        fetch(`/api/profile?email=${email}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name || "")
                setEmail(data.email || "")
                setBio(data.bio || "")
                setAvatarUrl(data.avatarUrl || "")
            })
    }, [])
    function handleEdit() {
        setTempName(name)
        setTempBio(bio)
        setTempAvatar(avatarUrl)
        setEditing(true)
        setSuccess(false)
    }

    function handleCancel() {
        setEditing(false)
    }


        async function handleSave() {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name: tempName, bio: tempBio, avatarUrl: tempAvatar }),
            })

            console.log("STATUS:", res.status)

            const data = await res.json()
            console.log("RESPONSE:", data)

            if (!res.ok) {
                console.log('Failed to save')
                setSuccess(false)
                return
            }

            setName(tempName)
            setBio(tempBio)
            setAvatarUrl(tempAvatar)
            setEditing(false)
            setSuccess(true)
        }


    return (
        <StyledPage>
            <StyledCard>

                <AvatarSection>
                    <Avatar
                        src={
                            avatarUrl ||
                            "https://cdn2.thecatapi.com/images/8pv.jpg"
                        }
                        alt="Profile picture"
                    />
                    <AvatarInfo>
                        <UserName>{name}</UserName>
                        <UserEmail>{email}</UserEmail>
                        {!editing && <EditLink onClick={handleEdit}>Edit profile</EditLink>}
                    </AvatarInfo>
                </AvatarSection>

                {success && <SuccessMsg>Profile updated successfully!</SuccessMsg>}


                {!editing && (
                    <>
                        <SectionTitle>About</SectionTitle>
                        <p style={{ fontSize: '15px', color: bio ? '#333' : '#aaa', lineHeight: 1.6 }}>
                            {bio || 'No bio yet — click Edit profile to add one.'}
                        </p>
                    </>
                )}


                {editing && (
                    <>
                        <SectionTitle>Edit Profile</SectionTitle>

                        <StyledLabel>Name</StyledLabel>
                        <StyledInput
                            type="text"
                            value={tempName}
                            onChange={e => setTempName(e.target.value)}
                        />

                        <StyledLabel>Bio</StyledLabel>
                        <StyledTextarea
                            placeholder="Tell us a little about yourself..."
                            value={tempBio}
                            onChange={e => setTempBio(e.target.value)}
                        />

                        <StyledLabel>Profile picture URL</StyledLabel>
                        <StyledInput
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            value={tempAvatar}
                            onChange={e => setTempAvatar(e.target.value)}
                        />

                        <ButtonRow>
                            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                            <StyledButton onClick={handleSave}>Save changes</StyledButton>
                        </ButtonRow>
                    </>
                )}

            </StyledCard>
        </StyledPage>
    )
}