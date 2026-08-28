import { $filter, $wordList, filterChanged, wordListGate } from "../model";
import { useGate, useUnit } from "effector-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { Button, FocusOnCtrlKey, Icons, Input, KeyboardShortcut } from "shared/ui";
import { MODALS, modalSearch } from "shared/routing";
import { SortSelector } from "./sort-selector";

export function WordList() {
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    return (
        <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2">
                <span className="pr-1">Word List</span>
                <motion.div layoutId="add-word" className="flex">
                    <FocusOnCtrlKey keyCode="ArrowRight">
                        <Button className="p-1" as={Link} to={{ search: modalSearch(MODALS.addWord) }}>
                            <Icons.Plus className="size-5" />
                        </Button>
                    </FocusOnCtrlKey>
                </motion.div>
                <KeyboardShortcut keys={["ctrl", "ArrowRight"]} />
                <SortSelector />
            </h1>
            <Input onChange={changeFilter} value={filter} placeholder="Search..." />
            {words.map(word => (
                <motion.div
                    key={word.id}
                    layoutId={word.word}
                    className="flex px-2 pl-1.5 py-1 border-b-2"
                >
                    <NavLink to={{ search: modalSearch(MODALS.editWord, { word: word.word }) }}>
                        <span>{word.word}</span>
                    </NavLink>
                </motion.div>
            ))}
        </div>
    )
}