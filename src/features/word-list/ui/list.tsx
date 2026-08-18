import { $filter, $wordList, filterChanged, wordListGate } from "../model";
import { useGate, useUnit } from "effector-react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router";
import { Button, Icons, Input } from "shared/ui";
import { SortSelector } from "./sort-selector";

export function WordList() {
    const location = useLocation();
    
    const [words, filter, changeFilter] = useUnit([$wordList, $filter, filterChanged]);

    useGate(wordListGate);

    const activeWord = location.pathname.split('/').pop();

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
            {words.map(word => (
                <NavLink to={`/dashboard/${word.word}`} key={word.id}>
                    <motion.span key={word.id} layoutId={word.word}>{word.word}</motion.span>
                </NavLink>
            ))}
        </div>
    )
}