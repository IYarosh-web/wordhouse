import { useGate, useUnit } from "effector-react"
import { useRef } from "react";
import { useEffect } from "react";

import { Button, Icons } from "shared/ui";

import { $answer, $error, $gameStatus, $guesses, $userInput, gameStarted, guessSubmitted, resetGame, wordleGate } from "../model";
import { Results } from "./results";
import { Keyboard } from "./keyboard";

export function WidgetWordle() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [
    answer,
    input,
    guesses,
    handleSubmit,
    error,
    gameStatus,
    reset,
  ] = useUnit([
    $answer,
    $userInput,
    $guesses,
    guessSubmitted,
    $error,
    $gameStatus,
    gameStarted,
  ]);

  useGate(wordleGate);

  useEffect(() => {
    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        submitButtonRef.current?.click();
      }
    }
    document.addEventListener('keydown', handleSubmit);
    return () => document.removeEventListener('keydown', handleSubmit);
  }, []);


  return (
    <>
      <div className="flex flex-col gap-2 m-auto h-full">
          <h3 className="text-2xl text-center font-bold">Wordle <Button onClick={reset}><Icons.ArrowsRotateLeft /></Button></h3>
          <p className="min-h-6 text-center">
            {error && <span className="text-red-500">{error}</span>}
            {gameStatus === 'won' && <span className="text-green-500">You won!</span>}
            {gameStatus === 'lost' && <span className="text-red-500">Unfrotunately, you've lost! The word was {answer}.</span>}
          </p>
          <Results guesses={guesses} answer={answer} />
      </div>
      <div className="flex flex-col gap-2">
          <form action="#" className="min-h-20 flex flex-col gap-2" onSubmit={handleSubmit}>
            <span className="text-center">Your guess:</span>
            <input type="text" name="guess" value={input} className="hidden" />
            <div className="flex gap-2 justify-center">
              {answer.split('').map((_, index) => (
                <span key={index} className="p-1 w-6 h-6 border flex items-center justify-center">{input[index]}</span>
              ))}
            </div>
            <Button className="w-min mx-auto" type="submit" ref={submitButtonRef}>Submit</Button>
          </form>
          <Keyboard />  
      </div>
    </>
  )
}