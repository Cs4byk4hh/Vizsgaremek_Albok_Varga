import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  email: string = "";
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const bejelentkezes = {
      email: this.email,
      username: this.username,
      password: this.password
    };

      this.http.post<{ token: string, userID: string }>('http://localhost:3000/auth/login', bejelentkezes)
      .subscribe(res => {
        const token = res.token;
        const userID = res.userID;
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
        console.log("Sikeres bejelentkezés!", token);
        this.router.navigate(['/velemenyek']);
        this.email = '',
        this.username = '';
        this.password = '';
      }, error => {
        console.error("Hiba a bejelentkezés során!", error);
      });
  }
}
