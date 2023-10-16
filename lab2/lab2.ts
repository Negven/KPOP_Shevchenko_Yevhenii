import {Author, Librarian, PrizeLogger, worker} from "./types";
import {Category} from "./Category";
import {UniversityLibrarian} from "./classes/UniversityLibrarian";
import {ReferenceItem} from "./classes/ReferenceItem";
import {Encyclopedia} from "./classes/Encyclopedia";

function getAllWorkers():worker[] {
    const workers: worker[] = [
        {id: 0,name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: Category.BA},
        {id: 1,name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: Category.Developer},
        {id: 2,name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: Category.Developer},
        {id: 3,name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: Category.QA}
    ]
    return workers;
}

function logFirstAvailable(workers: worker[]): void{
    console.log(`Кількість працівників в масиві: ${workers.length}`);
    for (const worker of workers) {
        if(worker.available) {
            console.log(`Доступні працівники ${worker.name} ${worker.surname}`)
            break;
        }
    }
}

function getWorkersNamesByCategory(category: Category): string[] {
    return getAllWorkers().filter(worker => worker.category === category).map(worker => `${worker.name} ${worker.surname}`)
}

function logWorkersNames(namesArray: string[]): void {
    namesArray.forEach(workerName => console.log(workerName))
}

function getWorkerByID(id: number): worker {
    return getAllWorkers().find(worker => worker.id === id);;
}

function printWorker(worker: worker): string {
    return `${worker.name} ${worker.surname}, salary: ${worker.salary}`;
}

function createCustomerID(name: string, id: number): string {
    return name + id;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`${name} ${age ? age + " " : ''}${city ? city : ''}`)
}



// lab2
const logPrize: PrizeLogger = (name: string) => {
    console.log(`Hi, ${name}`)
}

const favoriteAuthor: Author = {
    name: "Andjei",
    email: "andjeisabk@gmail.com",
    numBooksPublished: 10
}

// const favoriteLibrarian: Librarian = {
//     name: "Yevhenii",
//     email: "yevhenii@gmail.com",
//     department: "dep1",
//     assistCustomer: (custName: string) => console.log("Hi, " + custName)
// }


const favoriteLibrarian: Librarian = new UniversityLibrarian("Yevhenii", "yevhenii@gmail.com", "dep1")

// const ref = new ReferenceItem("titleName", 2023)

console.log('1. ');
logFirstAvailable(getAllWorkers())

console.log('2. ');
logWorkersNames(getWorkersNamesByCategory(Category.Developer));

console.log('3. ');
console.log(printWorker(getWorkerByID(2)));

console.log('4. ');
const myId: string = createCustomerID('Ann', 10);
console.log(myId);
const idGenerator: typeof createCustomerID = (name: string, id: number) => {
    return name + id;
}

console.log('5. ');
createCustomer("Yevhenii");
createCustomer("Yevhenii", 20);
createCustomer("Yevhenii", 20, "Kyiv");

console.log("Lab 2")
logPrize("Yevhenii");

console.log(favoriteAuthor);
favoriteLibrarian.assistCustomer("name1")

// ref.printItem();
// ref.publisher = "test string"
// console.log(ref.publisher);

const enc = new Encyclopedia("titleName", 2023, 2)
enc.printItem();
enc.printCitation();