import { FirebaseWordsApi } from "./firebase";
import { userApi } from "entities/user/api";

export const wordsApi = new FirebaseWordsApi({
    userApi: userApi,
});
