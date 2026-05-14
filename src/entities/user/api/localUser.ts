import { User } from "../model/types";
import { UserApi } from "./types";

class LocalUserApi implements UserApi {
    user: User | null = null;

    getUser(): User {
        return this.user ?? null;
    }

    signup(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.user) {
                reject(new Error('User already exists'));
            }
            this.user = { id: "1", username };
            localStorage.setItem('user', JSON.stringify(this.user));
            resolve();
        });
    }

    login(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.user = { id: "1", username };
            localStorage.setItem('user', JSON.stringify(this.user));
            resolve();
        });
    }

    logout(): Promise<void> {
        return new Promise((resolve) => {
            this.user = null;
            localStorage.removeItem('user');
            resolve();
        });
    }
}

export const localUserApi = new LocalUserApi();