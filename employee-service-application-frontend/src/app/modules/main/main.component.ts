import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { SidebarConfig } from 'src/app/shared/interfaces/sidebar-config.interface';
import { MENU_ITEMS } from 'src/app/shared/config/menu-items-data';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  mobileQuery: MediaQueryList;
  sidebarConfig: SidebarConfig = MENU_ITEMS;
  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

}
