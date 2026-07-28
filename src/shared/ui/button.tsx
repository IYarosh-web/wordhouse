import { Button as HeroButton, ButtonProps } from "@heroui/react";

import { forwardRef } from "react";

const _Button = (props: ButtonProps) => {
    return <HeroButton {...props} />;
}

const Button = forwardRef(_Button);

export { Button };