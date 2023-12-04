import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {ArrOutComponent} from "../arr-out/arr-out.component";

@Component({
  selector: 'app-arr-in',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ArrOutComponent
  ],
  templateUrl: './arr-in.component.html',
  styleUrl: './arr-in.component.css'
})
export class ArrInComponent {
  numArr: number[] = [];
  currentNumber: number|undefined;
  addNumber() {
    if(this.currentNumber) {
      this.numArr = [...this.numArr, this.currentNumber];
    }
  }
}
