import { Author } from "./Author";
import { Publisher } from "./Publisher";

export interface Book{
    id: number;
    title: string;
    published_date: Date;
    description: string;
    author: Author;
    publisher: Publisher;
}