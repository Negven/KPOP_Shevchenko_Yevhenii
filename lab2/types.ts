import { Category } from "./Category";

export interface worker {
    id: number,
    name: string,
    surname: string,
    available: boolean,
    salary: number,
    category: Category
}

export interface PrizeLogger {
    (str: string): void
}

export interface Person {
    name: string,
    email: string
}

export interface Author extends Person{
    numBooksPublished: number
}

export interface Librarian extends Person {
    department: string,
    assistCustomer:(custName: string) => void
}
