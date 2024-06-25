import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';



@NgModule({
  declarations: [HeroListComponent, HeroSearchComponent],
  imports: [
    CommonModule
  ]
})
export class HeroModule { }
