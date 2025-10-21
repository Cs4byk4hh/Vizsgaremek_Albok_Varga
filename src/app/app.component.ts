import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reglog';
}
