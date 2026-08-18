import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

import { forwardRef } from "react";

const _Button = (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return <HeadlessButton {...props} ref={ref} />;
}

const Button = forwardRef(_Button);

export { Button };