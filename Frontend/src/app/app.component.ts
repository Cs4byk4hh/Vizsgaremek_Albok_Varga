import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registerlog';
  constructor(public authService: AuthService) {}
}