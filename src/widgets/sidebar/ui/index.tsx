import { useUnit } from "effector-react";
import { $uniqueWordsStore } from "entities/word";
import { Button } from "shared/ui";
import { itemFocused, $lastFocusedItem } from "../model";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
export function Sidebar() {
  const addWordRef = useRef<HTMLButtonElement>(null);

  const [words, onItemFocus, lastFocusedItem] = useUnit([
    $uniqueWordsStore,
    itemFocused,
    $lastFocusedItem,
  ]);

  useEffect(() => {
    const handleArrowLeftPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "ArrowLeft") {
        if (lastFocusedItem) {
          lastFocusedItem.focus();
        } else {
          addWordRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleArrowLeftPress);
    return () => document.removeEventListener("keydown", handleArrowLeftPress);
  }, [lastFocusedItem]);

  return (
    <div className={styles.wrapper + " h-full"}>
      <div
        className={`flex flex-col gap-2 p-4 mx-2 border-4 border-gray-800 bg-amber-100 rounded-2xl overflow-y-auto h-full`}
      >
        <Button
          ref={addWordRef}
          className={`hover:bg-gray-100`}
          name="add-word"
          onFocus={onItemFocus}
          tabIndex={0}
          autoFocus={false}
        >
          Add Word
        </Button>
        {words.map((word) => (
          <Button
            key={word.id}
            data-word={word.word}
            onFocus={onItemFocus}
          >
            <span>{word.word}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
