
export interface NoteInterface {
    _id: string;
    title: string;
    content: string;
    imagePath: string;
    color: string;
}

export class User {
    id: number;
    username: string;
    password: string;
    token: string;
}