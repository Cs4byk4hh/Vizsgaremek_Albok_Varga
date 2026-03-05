import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// --- ÚJ IMPORTOK (ezek kellenek az ikonokhoz és a vonalhoz) ---
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ CommonModule, FormsModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule     
  ]
})
export class ProfileComponent implements OnInit {

  user = {
    name: '',
    username: '',
    email: ''
  };

  editUser = {
    name: '',
    username: '',
    email: ''
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>('http://localhost:3000/profile/getprofile', { headers }) 
      .subscribe({
        next: (data) => {
          this.user = data; 
          this.editUser = { ...data }; 
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Hiba a profil betöltésekor', 'Bezár');
        }
      });
  }

  saveProfile() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.put('http://localhost:3000/profile/updateprofile', this.editUser, { headers })
      .subscribe({
        next: (res: any) => {
          this.snackBar.open('Profil sikeresen mentve!', 'OK', { duration: 3000, panelClass: ['success-snackbar'] });
          
          this.user = { ...this.editUser };
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Hiba a mentés során! Lehet, hogy foglalt az email?', 'Bezár', { duration: 4000 });
        }
      });
  }
}