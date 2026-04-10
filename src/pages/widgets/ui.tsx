import { WidgetsList } from "features/widgets-list";

export function WidgetsPage() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="text-4xl font-bold">Widgets</h1>
      <WidgetsList />
    </div>
  );
}