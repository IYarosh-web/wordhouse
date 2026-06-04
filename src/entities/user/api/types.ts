import { User } from "../model/types";

export interface UserApi {
    signup: (username: string, password: string) => Promise<User>;
    login: (username: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    getUser: () => User | null;
}