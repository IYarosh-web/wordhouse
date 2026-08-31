import { TextareaProps, Textarea as HeadlessTextarea } from "@headlessui/react";

const Textarea = (({ className, ...props }: TextareaProps) => (
  <HeadlessTextarea {...props} className={"border-2 px-2 py-1 " + className} />
)) as typeof HeadlessTextarea;

export { Textarea };
