import { Link, LinkProps } from "react-router";
import { MODALS, modalSearch } from "shared/routing";

type Props = {
  word: string;
};

export function WordLinkComponent({ word, ...rest }: Props & Omit<LinkProps, 'to'>) {
  return (
    <Link {...rest} to={{ search: modalSearch(MODALS.editWord, { word }) }}>
      <span>{word}</span>
    </Link>
  );
}
