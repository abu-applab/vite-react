
// Convert file → base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result?.toString().split(",")[1] || "";
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Generate a random ID (for delete/replace)
export const generateRandomId = (): number => {
    return Math.floor(Math.random() * 1_000_000_000); // random number between 0 and 999,999,999
};

// Create normalized object
export const createFileObject = async (file: File) => {
    const base64 = await fileToBase64(file);

    return {
        id: generateRandomId(),          // Unique ID for delete/replace
        fileBytes: base64,               // base64 string
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,             // <-- added fileSize in bytes
    };
};

// Add file
export const addFile = async (filesArray: any[], newFile: File) => {
    const fileObj = await createFileObject(newFile);
    return [...filesArray, fileObj];
};
