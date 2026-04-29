import { WidgetsList } from "features/widgets-list";

export function WidgetsPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">Widgets</h1>
      <WidgetsList />
    </div>
  );
}