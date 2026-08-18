import { ButtonProps, Button as HeadlessButton } from "@headlessui/react";

const Button = (({className, ...props}: ButtonProps) => (
    <HeadlessButton className={"br bg-[#FF9E20] " + className} {...props} />
)) as typeof HeadlessButton;


export { Button };