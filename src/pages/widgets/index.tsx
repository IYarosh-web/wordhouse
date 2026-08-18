import { WidgetsList } from "features/widgets-list";

export function Widgets() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Widgets</h1>
      <WidgetsList />
    </div>
  );
}