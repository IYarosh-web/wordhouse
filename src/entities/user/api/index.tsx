import { LocalUserApi } from "./localUser";
import { FirebaseUserApi } from "./firebase";

const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';

export const userApi = isDevelopment ? new LocalUserApi() : new FirebaseUserApi();
