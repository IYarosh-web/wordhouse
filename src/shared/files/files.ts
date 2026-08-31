import { FilesApi } from "./types";

export const createFilesApi = (): FilesApi => {
  return {
    downloadFile: async (filename: string, content: string) => {
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    },
    readUserFile: async () => {
      return new Promise((resolve, reject) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/json";
        fileInput.onchange = (event: Event) => {
          const target = event.target as HTMLInputElement;
          const file = target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve(String(event.target?.result));
            };
            reader.onerror = (event) => {
              reject(event.target?.error);
            };
            reader.readAsText(file);
          }
        };
        fileInput.click();
      });
    },
  };
};
