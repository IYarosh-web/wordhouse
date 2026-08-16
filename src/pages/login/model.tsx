import { createEffect, sample } from "effector";
import { userApi } from "entities/user/api";
import { redirectTo } from "shared/contracts";

export const loginFormSubmittedFx = createEffect(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    debugger;
    const user = await userApi.login(username, password);
    return user;
});

sample({
    clock: loginFormSubmittedFx.done,
    fn: () => '/dashboard',
    target: redirectTo,
});
