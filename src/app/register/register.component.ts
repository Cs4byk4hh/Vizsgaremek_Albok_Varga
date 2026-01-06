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
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient) {}

  register() {
    const regisztracio = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

     this.http.post('http://localhost:3000/auth/register', regisztracio) 
      .subscribe(res => {
        console.log("Sikeres regisztráció!");
        this.name = '';
        this.email = '';
        this.username = '';
        this.password = '';
      }, error => {
        console.error("Hiba a regisztráció során!", error);
      });
  }
}
