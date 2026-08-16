import { Button, Input } from "shared/ui";
import { useUnit } from "effector-react";
import { loginFormSubmittedFx } from "./model";

export function Login() {
    const [handleLoginFormSubmitted] = useUnit([loginFormSubmittedFx]);

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginFormSubmitted}>
                <Input name="username" type="text" required placeholder="Username" />
                <Input name="password" type="password" required placeholder="Password" />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}