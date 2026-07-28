import { useGate, useUnit } from "effector-react";

import { gameGate, $sentenceToFill, $answer, gameRestarted, $gameStatus, $hintsCount } from "../model";
import { Answer } from "./answer";

export function SentenceFillWidget() {
    const [sentenceToFill, answer, gameStatus, hintsCount, restart] = useUnit([$sentenceToFill, $answer, $gameStatus, $hintsCount, gameRestarted]);

    useGate(gameGate);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <span>{sentenceToFill}</span>
            <Answer value={answer} show={true} />
            <button onClick={() => restart()}>Restart</button>
        </div>
    )
}