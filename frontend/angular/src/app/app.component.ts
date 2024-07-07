import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {OrdersTableComponent} from './ordersTable/ordersTable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrdersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
