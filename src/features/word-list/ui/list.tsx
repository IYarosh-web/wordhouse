import { $filter, $wordList, filterChanged, wordListGate } from "../model";
import { useGate, useUnit } from "effector-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router";
import { Button, Icons, Input } from "shared/ui";
import { SortSelector } from "./sort-selector";

export function WordList() {
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    return (
        <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-2">
                <span className="pr-1">Word List</span>
                <motion.div layoutId="add-word" className="flex">
                    <Button className="p-1" as={Link} to="/dashboard/add-word">
                        <Icons.Plus className="size-5" />
                    </Button>
                </motion.div>
                <SortSelector />
            </h1>
            <Input onChange={changeFilter} value={filter} placeholder="Search..." />
            {words.map((word, index) => (
                <motion.div
                    key={word.id}
                    layoutId={word.word}
                    className="flex px-2 py-1 border-b-2"
                    // style={{backgroundColor: `hsl(${183 - index * 5}, 69%, 35%)`}}
                >
                    <NavLink to={`/dashboard/${word.word}`}>
                        <span>{word.word}</span>
                    </NavLink>
                </motion.div>
            ))}
        </div>
    )
}