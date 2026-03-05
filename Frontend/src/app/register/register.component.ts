import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, MatSnackBarModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  username: string = "";
  showPassword = false;

  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  register() {

    this.isSubmitting = true;

    const regisztracio = {
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    }

    this.http.post('http://localhost:3000/auth/register', regisztracio) 
      .subscribe({
        next: (res) => {
          console.log("Sikeres regisztráció!");
          this.snackBar.open('Sikeres regisztráció!', 'Bezár', { duration: 3000 });
           this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Hiba a regisztráció során!", error);
          this.snackBar.open('Hiba történt a regisztráció során!', 'Bezár', { duration: 3000 });
          this.isSubmitting = false; 
        }
      });
  }
}