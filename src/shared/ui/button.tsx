import { Button as HeroButton, ButtonProps } from "@heroui/react";

import { forwardRef } from "react";

const _Button = (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    return <HeroButton {...props} ref={ref} />;
}

const Button = forwardRef(_Button);

export { Button };