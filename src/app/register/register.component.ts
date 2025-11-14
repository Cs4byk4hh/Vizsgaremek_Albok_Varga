import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient) {}

  register() {
    const regisztracio = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/register', regisztracio)
      .subscribe({
        next: (res) => {
          console.log("Sikeres regisztráció!");
          this.name = '';
          this.email = '';
          this.password = '';
        },
        error: (err) => {
          console.error("Hiba a regisztráció során!", err);
        }
      });
  }
}
