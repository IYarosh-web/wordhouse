import * as Icons from "@gravity-ui/icons";

export { Icons };

export function Icon({ name }: { name: string }) {
  return <span className="material-symbols-outlined">{name}</span>;
}
