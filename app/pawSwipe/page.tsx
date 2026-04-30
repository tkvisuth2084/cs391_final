//Teammate that worked on this file: Napasorn Visuthiwat BU ID: U29608302

"use client";
import useSWR from "swr";
import styled from "styled-components";
import { useState } from "react";

// fetcher is passed to useSWR as the data-fetching function
const fetcher = (url: string) => fetch(url).then(res => res.json());


//styling using styled-components

//centered column layout
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


//card styling
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
`;

//heart button styling
//accept a liked prop (string) to toggle the icon color from orange to red
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

    //fetch the full list of adoptable pets from internal API
    const { data, error } = useSWR("/api/pet", fetcher);
    //track which pet in the array is being shown
    const [currentIndex, setCurrentIndex] = useState(0);
    //control YOU MATCH! pop up after a like
    const [showMatch, setShowMatch] = useState(false);
    //track if the user has liked the pet
    const [liked, setLiked] = useState(false);

    if (error) return <h2>Error</h2>;
    if (!data) return <h2>Loading...</h2>;

    //Move to the previous pet and reset the liked state
    const prev = () => { setCurrentIndex(i => i - 1); setLiked(false); };
    //move to the next pet and reset liked state
    const next = () => { setCurrentIndex(i => i + 1); setLiked(false); };

    //mark the current pet as liked and show the YOU MATCH! banner
    //then hide it after 1.8 seconds with setTimeout
    const handleHeart = () => {
        setLiked(true);
        setShowMatch(true);
        setTimeout(() => setShowMatch(false), 1800);
    };

    const pet = data[currentIndex];

    return (
        <Container>
            {/*Conditionally render the MatchBanner if showMatch is true*/}
            {showMatch && <MatchBanner>🐾 You Match!</MatchBanner>}
            <CardWrapper>
                {/*pass like as a string*/}
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