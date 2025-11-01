import { useUnit } from "effector-react";
import { $answer } from "../model";
import { checkLetters } from "../model/helpers";

type Props = {
    guess: string;
}

function UserGuess({ guess }: Props) {
    const [answer] = useUnit([$answer]);
    console.log(answer);
    const letters = checkLetters(guess, answer);

    return (
        <span>
            {letters.map((item, index) => (
                <span key={index} className={`${item.status === 'correct' ? 'text-green-500' : item.status === 'misplaced' ? 'text-yellow-500' : 'text-gray-500'}`}>
                    {item.letter}
                </span>
            ))}
        </span>
    );
}

export default UserGuess;