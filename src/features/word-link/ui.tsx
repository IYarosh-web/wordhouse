import { useEffect, useRef } from "react";
import { Link, LinkProps } from "react-router";
import { MODALS, modalSearch } from "shared/routing";

type Props = {
  word: string;
};

export function WordLinkComponent({ word, ...rest }: Props & Omit<LinkProps, 'to'>) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    rest.autoFocus && ref.current && ref.current.focus();
  }, []);

  return (
    <Link ref={ref} {...rest} to={{ search: modalSearch(MODALS.editWord, { word }) }}>
      <span>{word}</span>
    </Link>
  );
}
