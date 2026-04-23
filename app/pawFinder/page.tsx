//Teammates who worked on this file: Rianna James
"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Quiz from "@/components/Quiz";

// main wrapper for the page layout
// this centers everything both vertically and horizontally
const StyledMain = styled.main`
    height: 100vh;              /* full screen height */
    display: flex;                  /* enables flexbox */
    flex-direction: column;         /* stack items vertically */
    justify-content: center;        /* center vertically */
    align-items: center;            /* center horizontally */
    text-align: center;             /* center text */
    padding: 1rem;
    gap: 2rem;
    font-size: 20px;
    background-color: #ffedce;
    h4{
        width: 60%;        /* squishes the text horizontally */
       
    }
`;

// styled button for starting the quiz
const StyledButton = styled.button`
    margin-top: 1rem;
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
export default function Page() {
    // stores the list of pets loaded from the API
    const [pets, setPets] = useState([]);

    // controls whether the quiz is visible or not
    const [startQuiz, setStartQuiz] = useState(false);

    // fetch pets once when the page loads
    useEffect(() => {
        const loadPets = async () => {
            try {
                const res = await fetch("/api/pet");
                const data = await res.json();
                setPets(data); // no safety check needed
            } catch {
                setPets([]); // fallback if API fails
            }
        };

        loadPets();
    }, []);

    // if the API returned nothing, show a fallback message
    if (pets.length === 0) {
        return (
            <StyledMain>
                <p>The quiz is currently not working, please return later.</p>
            </StyledMain>
        );
    }

    return (
        /*
        In the tag we're returning we have two options.
        If the startQuiz is false than we will show the start page screen.
        If the startQuiz is false we will load the quiz component and start the Quiz.
        */
        <StyledMain>
            {/* START SCREEN — shown until the user clicks "Start Quiz" */}
            {!startQuiz && (
                <>
                    <h1>Need help finding your best friend?</h1>
                    <h3>Take this quiz and discover your perfect match!</h3>

                    <h4>
                        Having trouble deciding what kind of pet you want?
                        This quiz helps match you to a pet based on your responses.
                        You will learn the pet’s name, breed, gender, and age!
                    </h4>


                    <StyledButton onClick={() => setStartQuiz(true)}>
                        Start Quiz
                    </StyledButton>
                </>
            )}

            {/* QUIZ SCREEN — shown after clicking Start Quiz */}
            {startQuiz && (
                <Quiz
                    pets={pets}
                    onReset={() => setStartQuiz(false)}  /* sends user back to Start screen */
                />
            )}
        </StyledMain>
    );
}
