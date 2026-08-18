import { forwardRef } from "react";
import { Input as HeadlessInput, InputProps } from "@headlessui/react";

export const _Input = (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <HeadlessInput {...props} ref={ref} />;
}

const Input = forwardRef(_Input);

export { Input };