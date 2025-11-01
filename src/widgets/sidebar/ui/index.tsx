import { useUnit } from "effector-react";
import { $uniqueWordsStore } from "entities/word";
import { Button } from "shared/ui";
import { itemFocused, $lastFocusedItem } from "../model";
import { useEffect, useState } from "react";

export function Sidebar() {
    const [words, onItemFocus, lastFocusedItem] = useUnit([$uniqueWordsStore, itemFocused, $lastFocusedItem]);

    useEffect(() => {
        const handleArrowLeftPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                if (lastFocusedItem) {
                    lastFocusedItem.focus();
                }
            }
        };

        document.addEventListener('keydown', handleArrowLeftPress);
        return () => document.removeEventListener('keydown', handleArrowLeftPress);
    }, [lastFocusedItem]);


    return (
        <div className="flex flex-col gap-2">
            <Button
                className={`w-full border border-gray-300 p-2 hover:bg-gray-100`}
                name="add-word"
                onFocus={onItemFocus}
                tabIndex={0}
                autoFocus={false}
            >
                Add Word
            </Button>
            {words.map(word => (
                <Button
                    key={word.id}
                    data-word={word.word}
                    onFocus={onItemFocus}
                    className={`flex border border-gray-300 p-2 hover:bg-gray-100`}>
                    <span>{word.word}</span>
                </Button>
            ))}
        </div>
    );
}