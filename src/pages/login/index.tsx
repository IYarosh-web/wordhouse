import { Button, Input } from "shared/ui";
import { useUnit } from "effector-react";
import { loginFormSubmitted } from "./model";

export function Login() {
    const [handleLoginFormSubmitted] = useUnit([loginFormSubmitted]);
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginFormSubmitted}>
                <Input type="text" required placeholder="Username" />
                <Input type="password" required placeholder="Password" />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}