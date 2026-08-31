type Props = {
  value: string;
  show?: boolean;
  hintsCount?: number;
};

export function Answer({ value, show = false, hintsCount = 0 }: Props) {
  return (
    <span>
      {Array.from(value).map((letter, index) =>
        index < hintsCount ? (
          <span className="underline" key={letter}>
            {letter}
          </span>
        ) : (
          <span className="underline" key={letter}>
            &nbsp;
          </span>
        ),
      )}
    </span>
  );
}
