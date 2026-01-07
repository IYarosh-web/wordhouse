import styles from "./styles.module.css";

type NotebookLayoutProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export function NotebookLayout({ left, right }: NotebookLayoutProps) {
  return (
    <>
      <div
        className={`left border-4 border-gray-950 rounded-2xl p-1 bg-amber-950 ${styles.left}`}
      >
        <div
          className={`border-4 border-gray-950 rounded-2xl px-2 pr-10 h-full bg-orange-50`}
        >
          {left}
        </div>
      </div>
      <div
        className={`right border-4 border-gray-950 rounded-2xl p-1 relative bg-amber-950 ${styles.right}`}
      >
        <div
          className={`border-4 border-gray-950 rounded-2xl px-2 pl-10 h-full bg-orange-50`}
        >
          {right}
        </div>
      </div>
    </>
  );
}
