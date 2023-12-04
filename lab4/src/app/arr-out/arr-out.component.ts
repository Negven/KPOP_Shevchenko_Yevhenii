import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-arr-out',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './arr-out.component.html',
  styleUrl: './arr-out.component.css'
})
export class ArrOutComponent implements OnChanges{
  @Input() numArr: number[] = [];
  minMaxArr: number[] = []
  ngOnChanges(changes: SimpleChanges) {
    if (changes['numArr']) {
      this.changeArr();
    }
  }

  changeArr(){
    if(this.numArr.length > 2) {
      let minIndex = this.numArr.indexOf(Math.min(...this.numArr))
      let maxIndex = this.numArr.indexOf(Math.max(...this.numArr))
      if (minIndex > maxIndex) [minIndex, maxIndex] = [maxIndex, minIndex]
      this.minMaxArr = this.numArr.slice(minIndex + 1, maxIndex)
    }
  }

}
