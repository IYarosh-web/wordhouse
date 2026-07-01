import { WordApi, WordApiDeps } from "./types";
import { Word, WordDTO } from "../model/types";
import { UserApi } from "entities/user/api/types";
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, updateDoc } from "firebase/firestore";
import { db } from "app/firebase";
import { isWordValid, isWordValidDTO } from "../model/lib";

export class FirebaseWordsApi implements WordApi {
    private db: Firestore;
    private userApi: UserApi;
    
    constructor(deps: WordApiDeps) {
        this.userApi = deps.userApi;
        this.db = db;
    }

    async getWords() {
        try {
            const user = this.userApi.getUser();
            if (!user) {
                throw new Error('User not found');
            }
            const words: Word[] = [];
            const querySnapshot = await getDocs(collection(this.db, `words.${user.id}`));
            querySnapshot.forEach((doc) => {
                words.push({
                    ...doc.data() as Word,
                    id: doc.id,
                } as Word);
            });

            return words;
        } catch (error) {
            console.error(`Error getting words: ${error}`);
            throw error;
        }
    }

    async getWord(id: string) {
        const words = await this.getWords();
        return words.find(w => w.id === id);
    }

    async createWord(word: WordDTO) {
        try {
        const user = this.userApi.getUser();

        if (!user) {
            throw new Error('User not found');
        }
        if (!isWordValidDTO(word)) {
            throw new Error('Word is not valid');
        }
        const docRef = await addDoc(collection(this.db, `words.${user.id}`), word);

        return {
            ...word,
            id: docRef.id,
        } as Word;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateWord(word: Word) {
        const user = this.userApi.getUser();
        if (!user) {
            throw new Error('User not found');
        }
        if (!isWordValid(word)) {
            throw new Error('Word is not valid');
        }
        await updateDoc(doc(this.db, `words.${user.id}/${word.id}`), word);
        return word;
    }

    async deleteWord(id: string) {
        const user = this.userApi.getUser();
         if (!user) {
            throw new Error('User not found');
        }
        await deleteDoc(doc(this.db, `words.${user.id}`, id));
    }

    async uploadWords(words: Word[]) {
        return;
    }
};
