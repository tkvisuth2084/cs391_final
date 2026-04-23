//Teammates who worked on this file: Rianna James
"use client";

import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

// This container holds the quiz questions and the result
const Box = styled.div`
  
    width: 450px;
    border-radius: 16px;
    border: solid black 2px;
    box-shadow: 2px 2px 3px black;
    background: #e88504;
    padding: 16px;
    font-size: 15px;
`;

// This is used to style the answer choices
const StyledButton = styled.button`
    width: 70%;
    padding: 0.75rem;
    margin-top: 1rem;
    border-radius: 3px;
    border: 4px solid #d24e01;
    background: white;
    transition: 0.2s;
    font-size: 20px; 
    font-weight: bold;

    &:hover {
        background: #f5c77e;
    }
`;

// This is the reset quiz button
const ResetButton = styled.button`
    padding: 0.75rem 1.25rem;
    background: #e88504;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background: #d24e01;
    }
`;

// container for the matched pet display
const PetCard = styled.div`
    margin-top: 1.5rem;
    text-align: left;
    h2{
        color: #0a0a0a;
    }
    p{
        color: #fafafa;
    }
`;

const ImageWrapper = styled.div`
  width: 350px;
  height: 250px;
  position: relative;
  margin: 1rem auto;
  border-radius: 12px;
  overflow: hidden;
`;

export default function Quiz({ pets, onReset }: any) {
    // all quiz questions and answer choices
    const questions = [
        { text: "What energy level do you prefer in a pet?", options: ["Calm & relaxed", "Balanced", "High energy"] },
        { text: "How much space do you have?", options: ["Small apartment", "House with a yard", "Rural or lots of land"] },
        { text: "How much time can you spend with your pet?", options: ["Under an hour", "1-3 hours", "Most of the day"] },
        { text: "How do you feel about a pet that makes noise?", options: ["Quiet", "Occasional", "Very vocal"] },
        { text: "How experienced are you with pets?", options: ["Beginner", "Some experience", "Very experienced"] },
        { text: "Do you want a pet that needs regular grooming?", options: ["Low grooming", "Medium grooming", "High grooming"] },
    ];

    // which question the user is currently on
    const [step, setStep] = useState(0);

    // the final matched pet
    const [match, setMatch] = useState<any>(null);

    // handles moving through the quiz
    const next = () => {
        // if there are more questions left, move to the next one
        if (step < questions.length - 1) {
            setStep(step + 1);
            return;
        }

        //Once we hit the last question, we will pick a random pet from our list.
        if (pets.length > 0) {
            // Calculate our random number
            const i = Math.floor(Math.random() * pets.length);
            setMatch(pets[i]);
        }
    };

    return (
        <>
        <Box>
             {/*show questions until a match is found */}
            {!match && (
                <>
                    <h1>{questions[step].text}</h1>

                    {/* render each answer choice as a button */}
                    {questions[step].options.map((opt) => (
                        <StyledButton key={opt} onClick={next}>
                            {opt}
                        </StyledButton>
                    ))}
                </>
            )}

            {/* once a match is chosen, show the pet card */}
            {match && (
                <>
                    <h1>Your Perfect Match Is</h1>
                    <PetCard>
                        <ImageWrapper>
                            <Image
                                src={match.attributes.pictureThumbnailUrl}
                                alt={match.attributes.name}
                                fill
                                sizes="350px"
                                style={{ objectFit: "cover" }}
                            />

                        </ImageWrapper>
                        <h2>{match.attributes.name}</h2>
                        <p>{match.attributes.breedPrimary}</p>
                        <p>
                            {match.attributes.ageGroup}  {match.attributes.sex}
                        </p>

                    </PetCard>

                 </>

            )}
        </Box>
            {/* reset button that sends user back to Start Quiz screen */}
            <ResetButton onClick={onReset}>Reset the Quiz</ResetButton>
        </>
    );
}
