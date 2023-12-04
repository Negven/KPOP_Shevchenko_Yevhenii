import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {character} from "./types/character";
import {CardComponent} from "./card/card.component";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    CardComponent,
    PopUpComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab5';
  urlApi ="https://rickandmortyapi.com/api/character"
  response: any;
  characters: character[] = [];
  favoriteCharacters: character[] = [];
  activeCharacter: character | undefined;

  closePopUp(event: Event){
    if(event.target instanceof HTMLDivElement) {
      if(event.target.classList.contains("back")) {
        this.changeActiveCharacter(undefined)
      }
    }
  }

  openPopUp(event: Event, character: character) {
    if(!(event.target instanceof HTMLButtonElement)) {
        this.changeActiveCharacter(character)
    }
  }

  addFavorite(event: Event, character: character) {
    if(event.target instanceof HTMLButtonElement) {
      this.favoriteCharacters = [...this.favoriteCharacters, character]
    }
  }

  changeActiveCharacter(character: character | undefined ) {
    this.activeCharacter = character;
    console.log("open")
  }

  constructor(private http: HttpClient) {
    this.search()
  }

  search() {
    this.http.get(this.urlApi).subscribe((response: any) => {
      this.response = response;
      this.characters = response.results;
    })
  }

  protected readonly eval = eval;
}
