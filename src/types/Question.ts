

export interface IQuestion {
    userId: number;
    id: number;
    title: string;
    body: string;
    answers?: { option: string; text: string }[];
}