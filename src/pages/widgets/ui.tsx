import { Link } from "react-router";

import { NotebookLayout } from "widgets/notebook-layout/ui";
import { Button } from "shared/ui";

function WidgetsPage() {
  return (
    <NotebookLayout
      left={
        <div className="flex flex-col gap-2 p-4">
          <Link to="/widget/wordle">
            <Button className="w-full"> Wordle</Button>
          </Link>
          <Link to="/widget/wordle">
            <Button className="w-full"> Wordle</Button>
          </Link>
        </div>
      }
    />
  );
}

export { WidgetsPage };
