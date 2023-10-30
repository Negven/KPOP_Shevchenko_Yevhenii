import { Component } from '@angular/core';

@Component({
    selector: 'app-reverse-string',
    template: `
        <div>
            <input [(ngModel)]="inputString" (input)="reverseString()" placeholder="Введіть рядок">
            <p>Зворотній рядок: {{ reversedString }}</p>
        </div>
    `
})
export class AppComponent {
    inputString: string = '';
    reversedString: string = '';

    reverseString() {
        this.reversedString = this.inputString.split('').reverse().join('');
    }
}