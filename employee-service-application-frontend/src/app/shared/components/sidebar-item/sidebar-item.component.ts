import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SidebarItem } from '../../interfaces/sidebar-item.interface';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarItemComponent implements OnInit {
  @Input() sidebarItem: SidebarItem;
  constructor() { }

  ngOnInit(): void {
  }

}
