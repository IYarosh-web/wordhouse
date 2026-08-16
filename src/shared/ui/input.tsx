import { forwardRef } from "react";
import { Input as HeroInput, InputProps } from "@heroui/react";

export const _Input = (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <HeroInput {...props} ref={ref} />;
}

const Input = forwardRef(_Input);

export { Input };