import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SidebarConfig } from '../../interfaces/sidebar-config.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  @Input() sidebarConfig: SidebarConfig;
  constructor() { }

  ngOnInit() {
  }

}
