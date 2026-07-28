import { forwardRef } from "react";
import { Input as HeroInput, InputProps } from "@heroui/react";

export const _Input = (props: InputProps) => {
    return <HeroInput {...props} />;
}

const Input = forwardRef(_Input);

export { Input };