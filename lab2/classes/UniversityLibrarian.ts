import {Librarian} from "../types";

export class UniversityLibrarian implements Librarian{
    name: string
    email: string
    department: string
    assistCustomer= (custName: string) => console.log(`${this.name} is assisting ${custName}`)
    constructor(name: string, email: string, dep: string) {
        this.name = name;
        this.email = email;
        this.department = dep;
    }
}