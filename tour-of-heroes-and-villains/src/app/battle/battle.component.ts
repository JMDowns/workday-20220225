import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Villain } from '../villain'
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: [ './battle.component.css' ]
})
export class BattleComponent implements OnInit {
  battleString: String = "";
  selectedHero: Hero | undefined;
  selectedVillain: Villain | undefined;
  heroes$!: Observable<Hero[]>;
  villains$!: Observable<Villain[]>;
  private searchTermsHero = new Subject<string>();
  private searchTermsVillain = new Subject<string>();

  constructor(private heroService: HeroService, private villainService: VillainService) {}

  // Push a search term into the observable stream.
  searchHero(term: string): void {
    this.searchTermsHero.next(term);
  }

  searchVillain(term: string): void {
    this.searchTermsVillain.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTermsHero.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

    this.villains$ = this.searchTermsVillain.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.villainService.searchVillains(term)),
    );
  }

  addHero(hero: Hero) {
    this.selectedHero = hero;
  }

  addVillain(villain: Villain) {
    this.selectedVillain = villain;
  }

  simulateBattle() {
    if (!this.selectedHero || !this.selectedVillain) {
      this.battleString = "Two must exist to fight a battle!";
    }
    else if (this.selectedHero.powerLevel > this.selectedVillain.powerLevel) {
      this.battleString = `${this.selectedHero.name} defeated ${this.selectedVillain.name}!`;
    } 
    else {
      this.battleString = `${this.selectedVillain.name} defeated ${this.selectedHero.name}!`;
    }
  }

}
