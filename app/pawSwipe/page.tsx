"use client";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #ffedce;
`;

const CardWrapper = styled.div`
    position: relative;
    width: 420px;
`;

const Card = styled.div`
    width: 420px;
    border-radius: 16px;
    overflow: hidden;
    border: solid black 2px;
    box-shadow: 2px 2px 3px black;
    background: #e88504;
`;

const PetImage = styled.img`
    width: 100%;
    height: 420px;
    object-fit: cover;
`;

const PetInfo = styled.div`
    padding: 1rem;
`;

const PetName = styled.h3`
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
`;

const PetDetails = styled.p`
    color: antiquewhite;
    margin: 4px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;
`;

const ArrowButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: solid #e88504 2px;
    font-size: 1.5rem;
    cursor: pointer;
    background: white;
    color: #e88504;
    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

const HeartButton = styled.button<{ liked: string }>`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: white;
    font-size: 1.4rem;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    color: ${({ liked }) => liked === "true" ? "red" : "#e88504"};
`;

const MatchBanner = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e88504;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 2rem;
    border-radius: 12px;
    z-index: 100;
    pointer-events: none;
`;


export default function PawSwipe() {
    const { data, error } = useSWR("/api/pet", fetcher);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMatch, setShowMatch] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likedPets, setLikedPets] = useState<string[]>([]);

    if (error) return <h2>Error</h2>;
    if (!data) return <h2>Loading...</h2>;

    const prev = () => { setCurrentIndex(i => i - 1); setLiked(false); };
    const next = () => { setCurrentIndex(i => i + 1); setLiked(false); };

    const handleHeart = () => {
        if(!liked) setLikedPets(prevLikedPets => [...prevLikedPets, pet.attributes.name]);
        setLiked(true);
        setShowMatch(true);
        setTimeout(() => setShowMatch(false), 1800);
    };

    const pet = data[currentIndex];

    return (
        <Container>
            {showMatch && <MatchBanner>🐾 You Match!</MatchBanner>}
            <CardWrapper>
                <HeartButton onClick={handleHeart} liked={liked.toString()}>🧡</HeartButton>
                <Card>
                    <PetImage
                        src={pet.attributes.pictureThumbnailUrl}
                        alt={pet.attributes.name}
                    />
                    <PetInfo>
                        <PetName>{pet.attributes.name}</PetName>
                        <PetDetails>{pet.attributes.breedPrimary}</PetDetails>
                        <PetDetails>{pet.attributes.ageGroup}</PetDetails>
                        <PetDetails>{pet.attributes.sex}</PetDetails>
                    </PetInfo>
                </Card>
            </CardWrapper>
            <ButtonContainer>
                <ArrowButton onClick={prev} disabled={currentIndex === 0}>◀</ArrowButton>
                <ArrowButton onClick={next} disabled={currentIndex === data.length - 1}>▶</ArrowButton>
            </ButtonContainer>
        </Container>
    );
}