import {ReferenceItem} from "./ReferenceItem";

export class Encyclopedia extends ReferenceItem{
    edition: number
    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`)
    }

    printCitation() {
        console.log(`${this.title} - ${this.year}`)
    }

    constructor(newTitle: string, newYear: number, edition: number) {
        super(newTitle, newYear);
        this.edition = edition;
    }
}