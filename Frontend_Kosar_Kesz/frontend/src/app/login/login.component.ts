import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: string = "";
  email: string = "";
  password: string = "";
  showPassword = false;

  loggedInUsername: string | null = null;
  loggedInRole: string | null = null;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {} 

  ngOnInit() {
    this.loggedInUsername = localStorage.getItem('username');
    this.loggedInRole = localStorage.getItem('role');
  }

  login() {
    const bejelentkezes = {
      email: this.email,
      password: this.password,
      username: this.username
    };

    this.http.post<{ token: string, userId: string, username: string, role: string }>(
      'http://localhost:3000/auth/login',
      bejelentkezes
    ).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);

        this.loggedInUsername = res.username;
        this.loggedInRole = res.role;

        this.snackBar.open('Sikeres bejelentkezés!', 'Bezár', { duration: 3000 });

        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/velemenyek']);
        }
      },
      error: (err) => {
        console.error("Hiba a bejelentkezés során!", err);
        this.snackBar.open('Hiba a bejelentkezés során!', 'Bezár', { duration: 3000 });
      }
    });
  }
}