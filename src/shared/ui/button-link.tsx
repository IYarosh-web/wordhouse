import { buttonVariants, VariantProps } from "@heroui/react";
import { Link } from "react-router";

type ButtonLinkProps = { to: string } & VariantProps<typeof buttonVariants> & React.ComponentProps<typeof Link>;

function ButtonLink({ to, variant, size, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={`${buttonVariants({ variant, size, className })} outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2`} {...rest}>
      {children}
    </Link>
  );
}

export { ButtonLink };