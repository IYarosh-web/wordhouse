import { useGate, useUnit } from "effector-react"
import { useRef } from "react";
import { useEffect } from "react";

import { Button } from "shared/ui";

import { $answer, $error, $gameStatus, $guesses, $userInput, guessSubmitted, wordleGate } from "../model";
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
  ] = useUnit([
    $answer,
    $userInput,
    $guesses,
    guessSubmitted,
    $error,
    $gameStatus,
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
          <h3 className="text-2xl text-center font-bold">Wordle</h3>
          <p className="min-h-6">
            {error && <span className="text-red-500">{error}</span>}
            {gameStatus === 'won' && <span className="text-green-500">You won!</span>}
            {gameStatus === 'lost' && <span className="text-red-500">Unfrotunately, you've lost! The word was {answer}.</span>}
          </p>
          <Results guesses={guesses} answer={answer} />
      </div>
      <div>
          <form action="#" className="min-h-20 flex flex-col gap-2" onSubmit={handleSubmit}>
            <span className="text-center">Your guess:</span>
            <input type="text" name="guess" value={input} className="hidden" />
            <div className="flex gap-2 justify-center">
              {answer.split('').map((_, index) => (
                <span key={index} className="p-1 w-6 h-6 border-1 flex items-center justify-center">{input[index]}</span>
              ))}
            </div>
            <Button type="submit" ref={submitButtonRef}>Submit</Button>
          </form>
          <Keyboard />  
      </div>
    </>
  )
}