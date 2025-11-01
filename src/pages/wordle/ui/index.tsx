import { useEffect } from "react";
import { Keyboard } from "./keyboard";
import { UserInput } from "./userInput";
import { useUnit } from "effector-react";
import { $wordStore } from "entities/word";
import { gameInitialized } from "../model";
import { UserGuesses } from "./user-guesses";

function Wordle() {
    const [words, initGame] = useUnit([$wordStore, gameInitialized]);

    useEffect(() => {
        initGame();       
    }, [words]);

    return (
        <div>
            <UserInput />
            <UserGuesses />
            <Keyboard />
        </div>
    );
}

export default Wordle;