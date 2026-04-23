"use client";
import useSWR from "swr";
import TinderCard from "react-tinder-card"; //this is a library that I used for my card swipe UI
import styled from "styled-components";

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

const Card = styled.div`
        width: 300px;
        border-radius: 16px;
        overflow: hidden;
        border: solid black 2px;
        box-shadow: 2px 2px 3px black;
        background: #e88504;
        position: absolute;
    `;

const PetImage = styled.img`
      width: 100%;
      height: 300px;
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
    gap: 2rem;
    margin-top: 1rem;
`;
const LikeButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    background: white;
    color: #e88504;
    border: solid #e88504 2px;
`
const DislikeButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    background: white;
    color: red;
    border: solid red 2px;`

export default function PawSwipe() {
    const {data, error} = useSWR("/api/pet", fetcher);

    if (error) return <h2>Error</h2>;
    if (!data) return <h2>Loading...</h2>;

    const onSwipe = (direction: string, name: string) => {
        console.log("You swiped " + direction + " on " + name);
    };

    return (
        <Container>
            <div style={{position: "relative", width: "300px", height: "500px"}}>
                {data.map((pet: any) => (
                    <TinderCard
                        key={pet.id}
                        onSwipe={(dir) => onSwipe(dir, pet.attributes.name)}
                        preventSwipe={["up", "down"]}
                    >
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
                    </TinderCard>
                ))}
            </div>

            <ButtonContainer>
                <DislikeButton>✕</DislikeButton>
                <LikeButton>&hearts;</LikeButton>
            </ButtonContainer>
        </Container>
    );
}