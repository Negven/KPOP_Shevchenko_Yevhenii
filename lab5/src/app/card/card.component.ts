import {Component, EventEmitter, Input, Output} from '@angular/core';
import {character} from "../types/character";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() character: character | undefined;
}
