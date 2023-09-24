import { Category } from "./Category";

export type worker = {
    id: number,
    name: string,
    surname: string,
    available: boolean,
    salary: number,
    category: Category
}