import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor (private http: HttpClient) {}


login() {
  const bejelentkezes = {
    email: this.email,
    password: this.password
  }

  this.http.post('http://localhost:3000/login', bejelentkezes)
    .subscribe(response => {
      console.log("Sikeres bejelentkezés!");
    }, error => {
      console.log("Hiba a bejelentkezés során!");
    })
}}