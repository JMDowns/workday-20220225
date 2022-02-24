import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', numberDefeated: 1, powerLevel: 1 },
      { id: 12, name: 'Narco', numberDefeated: 1, powerLevel: 1 },
      { id: 13, name: 'Bombasto', numberDefeated: 1, powerLevel: 1 },
      { id: 14, name: 'Celeritas', numberDefeated: 1, powerLevel: 1 },
      { id: 15, name: 'Magneta', numberDefeated: 1, powerLevel: 1 },
      { id: 16, name: 'RubberMan', numberDefeated: 1, powerLevel: 1 },
      { id: 17, name: 'Dynama', numberDefeated: 1, powerLevel: 1 },
      { id: 18, name: 'Dr IQ', numberDefeated: 1, powerLevel: 1},
      { id: 19, name: 'Magma', numberDefeated: 1, powerLevel: 1 },
      { id: 20, name: 'Tornado', numberDefeated: 1, powerLevel: 1 }
    ];

    const villains = [
      { id: 11, name: 'Dr Mean', numberDefeated: 1, powerLevel: 1 },
      { id: 12, name: 'Varco', numberDefeated: 1, powerLevel: 1 },
      { id: 13, name: 'Napalmer', numberDefeated: 1, powerLevel: 1 },
      { id: 14, name: 'Celerytis', numberDefeated: 1, powerLevel: 1 },
      { id: 15, name: 'Magneto', numberDefeated: 1, powerLevel: 1 },
      { id: 16, name: 'RobberWoman', numberDefeated: 1, powerLevel: 1 },
      { id: 17, name: 'Dynima', numberDefeated: 1, powerLevel: 1 },
      { id: 18, name: 'Dr Stupid', numberDefeated: 1, powerLevel: 1 },
      { id: 19, name: 'Frozone', numberDefeated: 1, powerLevel: 1 },
      { id: 20, name: 'Mountain', numberDefeated: 1, powerLevel: 1 }
    ];
    return {heroes, villains};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Hero | Villain>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
