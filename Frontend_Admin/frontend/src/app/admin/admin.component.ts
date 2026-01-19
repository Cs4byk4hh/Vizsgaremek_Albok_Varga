import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Csak adminok férhetnek hozzá ehhez az oldalhoz!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs bejelentkezve!');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:3000/users/user', { headers })
      .subscribe(
        res => this.users = res,
        err => console.error('Hiba a felhasználók lekérdezésekor', err)
      );
  }

  deleteUser(userId: number) {
    if (!confirm('Biztosan törölni akarod ezt a felhasználót?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Nincs bejelentkezve!');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.delete(`http://localhost:3000/users/user/${userId}`, { headers })
      .subscribe({
        next: () => {
          this.loadUsers();
        },
        error: err => console.error('Hiba a felhasználó törlésekor', err)
      });
  }
}