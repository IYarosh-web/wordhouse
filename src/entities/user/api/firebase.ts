import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { UserApi } from "./types";
import { User } from "../model/types";

class FirebaseUserApi implements UserApi {
    private readonly auth: Auth;
    private user: User | null = null;

    constructor() {
        this.auth = getAuth();
        const savedUser =this.getUserFromLocalStorage();
        if (savedUser) {
            this.user = savedUser;
        }
    }

    async login(username: string, password: string): Promise<User> {
        const user = await signInWithEmailAndPassword(this.auth, username, password);
        this.user = { id: user.user.uid, username: user.user.email };
        this.saveUserToLocalStorage();
        return this.user;
    }

    async signup(username: string, password: string): Promise<User> {
        return {id: '', username: ''};
    }

    async logout(): Promise<void> {
        await this.auth.signOut();
    }

    private saveUserToLocalStorage(): void {
        const user = this.getUser();
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    private getUserFromLocalStorage(): User | null {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    getUser(): User | null {
        return this.user;
    }
}

export const firebaseUserApi = new FirebaseUserApi();