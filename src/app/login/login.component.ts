import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient) {}

  login() {
    const bejelentkezes = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ token: string }>('http://localhost:3000/login', bejelentkezes)
      .subscribe({
        next: (res) => {
          const token = res.token;
          localStorage.setItem('token', token);
          console.log("Sikeres bejelentkezés!", token);
          this.email = '';
          this.password = '';
        },
        error: (err) => {
          console.error("Hiba a bejelentkezés során!", err);
        }
      });
  }
}
