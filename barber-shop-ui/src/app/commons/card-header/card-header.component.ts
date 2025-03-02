import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-card-header',
  imports: [MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss'
})
export class CardHeaderComponent {

}
