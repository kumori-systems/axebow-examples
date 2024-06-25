import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Output() toggleNavbarButton = new EventEmitter<any>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  toggleBurgerButton(event) {
    this.toggleNavbarButton.next(event);
  }

  logout() {
    this.authService.logout();
  }

}
