import { useUnit } from "effector-react";
import { $userGuesses } from "../model";
import UserGuess from "./user-guess";

export function UserGuesses() {
    const [userGuesses] = useUnit([$userGuesses]);
    return (
        <div className="flex flex-col gap-2">
            {userGuesses.map((guess, index) => (
                <UserGuess key={index} guess={guess} />
            ))}
        </div>
    );
}

export default UserGuesses;