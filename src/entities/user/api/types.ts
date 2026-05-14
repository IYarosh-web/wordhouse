import { User } from "../model/types";

export interface UserApi {
    signup: (username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => User | null;
}