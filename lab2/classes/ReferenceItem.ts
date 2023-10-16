export abstract class ReferenceItem {
    // title: string
    // year: number
    private _publisher: string
    static department: string = "dep1"

    abstract printCitation(): void
    printItem(){
        console.log(`${this.title} was published in ${this.year} by ${ReferenceItem.department}`)
    }
    // constructor(newTitle: string, newYear: number) {
    //     console.log(`Creating a new ReferenceItem ...` )
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    constructor(public title: string, protected year: number) {

    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }
}