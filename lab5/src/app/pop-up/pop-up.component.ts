import {Component, EventEmitter, Input, Output} from '@angular/core';
import {character} from "../types/character";

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() character: character | undefined;
}
