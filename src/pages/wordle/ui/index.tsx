import { useEffect } from "react";
import { Keyboard } from "./keyboard";
import { UserInput } from "./user-input";
import { useUnit } from "effector-react";
import { $wordStore } from "entities/word";
import { gameInitialized } from "../model";
import { UserGuesses } from "./user-guesses";
import { NotebookLayout } from "widgets/notebook-layout/ui";

function Wordle() {
  const [words, initGame] = useUnit([$wordStore, gameInitialized]);

  useEffect(() => {
    initGame();
  }, [words]);

  return (
    <>
      <div className="sidebar"></div>
      <div className="navbar"></div>
      <NotebookLayout
        left={
          <div>
            <UserInput />
            <Keyboard />
          </div>
        }
        right={
          <div>
            <UserGuesses />
          </div>
        }
      />
    </>
  );
}

export default Wordle;
