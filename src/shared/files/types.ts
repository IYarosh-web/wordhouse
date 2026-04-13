export type FilesApi = {
    downloadFile: (filename: string, content: string) => Promise<void>;
    readUserFile: () => Promise<string>;
}