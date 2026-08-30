import { Link } from "react-router";
import { MODALS, modalSearch } from "shared/routing";

type Props = {
    word: string;
}

export function WordLinkComponent({ word }: Props) {
    return (
        <Link to={{ search: modalSearch(MODALS.editWord, { word }) }}>
            <span>{word}</span>
        </Link>
    )
}