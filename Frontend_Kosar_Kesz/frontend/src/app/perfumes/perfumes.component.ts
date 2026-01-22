import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PerfumeService } from '../services/perfumes.service';
import { Perfume } from './perfumes.model';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfumes',
  templateUrl: './perfumes.component.html',
  styleUrls: ['./perfumes.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  encapsulation: ViewEncapsulation.None
})
export class PerfumesComponent implements OnInit {

  perfumes: Perfume[] = [];
  cartItems: Perfume[] = [];

  constructor( private perfumesService: PerfumeService, private dialog: MatDialog, private http: HttpClient, private snackBar: MatSnackBar) {} 

  ngOnInit(): void {
    this.perfumesService.getPerfumes().subscribe({
      next: (data) => {
        this.perfumes = data;
      },
      error: (err) => {
        console.error('Hiba a parfümök lekérésekor', err);
        this.snackBar.open('Nem sikerült betölteni a parfümöket!', 'Bezár', { duration: 3000 });
      }
    });
  }

  getImagePath(perfumeName: string): string {
    const cleanedName = perfumeName.replace(/ /g, '');
    return `assets/images/${cleanedName}.jpg`;
  }

  addToCart(perfume: Perfume) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Nincs token a localStorage-ben!');
      this.snackBar.open('A vásárláshoz be kell jelentkezned!', 'Bezár', {
        duration: 3000,
        panelClass: ['warning-snackbar'] 
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    const payload = { perfumeId: perfume.id };

    this.http.post('http://localhost:3000/cart/add', payload, { headers })
      .subscribe({
        next: res => {
            console.log('Kosárba mentve:', res);          
            this.snackBar.open('Sikeresen a kosárba helyezve!', 'Rendben', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: err => {
          console.error('Hiba a mentésnél:', err);
          
          this.snackBar.open('Hiba történt a kosárba rakáskor!', 'Bezár', {
            duration: 3000
          });
        }
      });
  }

  openCart() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        this.snackBar.open('A kosár megtekintéséhez jelentkezz be!', 'Bezár', { duration: 3000 });
        return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/cart/get', { headers })
      .subscribe({
        next: (cartData) => {
          this.dialog.open(CartDialogComponent, {
            width: '500px',
            maxHeight: '80vh',
            data: cartData
          });
        },
        error: (err) => {
          console.error('Hiba a kosár lekérésekor:', err);
          this.snackBar.open('Nem sikerült megnyitni a kosarat.', 'Bezár', { duration: 3000 });
        }
      });
  }
}