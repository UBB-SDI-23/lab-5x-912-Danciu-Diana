import { Book } from "./Book";

export interface Author{
    id: number;
    first_name: string;
    last_name: string;
    no_of_prizes: number;
    no_of_books: number;
    date_of_birth: Date;
    book: Book[];
}