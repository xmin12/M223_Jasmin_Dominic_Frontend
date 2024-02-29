export interface ListEntry {
    id?: string;
    title: string;
    text: string;
    creationDate?: string; // Assuming creationDate is optional
    importance: number;
    user: {
        id: string;
    };
}
