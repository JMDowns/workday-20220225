import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { VillainsComponent } from './villains/villains.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail-hero/:id', component: HeroDetailComponent },
  { path: 'detail-villain/:id', component: VillainDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'villains', component: VillainsComponent },
  { path: 'battle', component: BattleComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
