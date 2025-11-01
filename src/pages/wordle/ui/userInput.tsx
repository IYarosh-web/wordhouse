import { useUnit } from "effector-react";
import { $userInput, gameInitialized, userInputChanged, userInputSubmitted } from "../model";
import { useEffect } from "react";
import { FocusTrap } from "@headlessui/react";

export function UserInput() {
    const [userInput, setUserInput, initGame, submitInput] = useUnit([$userInput, userInputChanged, gameInitialized, userInputSubmitted]);

    useEffect(() => {
        initGame();
    }, []);

    return (
        <div>
            <form onSubmit={submitInput}>
                <FocusTrap>
                    <input name="userInput" autoFocus type="text" value={userInput} onChange={(e) => setUserInput(e.target.value.toUpperCase())} />
                </FocusTrap>
            </form>
        </div>
    );
}
