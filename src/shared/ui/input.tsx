import { forwardRef } from "react";
import { Input as HeadlessInput, InputProps } from "@headlessui/react";

export const _Input = (
  { className, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <HeadlessInput
      className={"border-2 px-2 py-1 " + className}
      {...props}
      ref={ref}
    />
  );
};

const Input = forwardRef(_Input);

export { Input };
