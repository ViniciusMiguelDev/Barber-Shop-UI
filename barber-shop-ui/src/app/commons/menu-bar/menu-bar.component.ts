import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  imports: [MatButton, MatMenu, MatMenuModule, MatButtonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  constructor(private readonly routes: Router) {}

  navigateTo(path: string) {
    this.routes.navigate([path]);
  }
}
