import { WidgetsList } from "features/widgets-list";
import { KeyboardShortcut } from "shared/ui";

export function Widgets() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Widgets</h1>
        <KeyboardShortcut keys={["ArrowRight"]} />
      </div>
      <WidgetsList />
    </div>
  );
}
