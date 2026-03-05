import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  standalone: true,
  imports: [ CommonModule, MatListModule, MatButtonModule, HttpClientModule, MatDialogModule, MatIconModule ]
})

export class CartDialogComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/cart/get', { headers })
      .subscribe({
        next: (res) => {
          console.log('Backend válasz:', res); 
          this.cartItems = res;
        },
        error: (err) => console.error('Hiba a kosár lekérdezésekor:', err)
      });
  }

  increaseQuantity(item: any) {
    item.mennyiseg++;
  }

  decreaseQuantity(item: any) {
    if (item.mennyiseg > 1) {
      item.mennyiseg--;
    }
  }

  removeFromCart(cartItem: any) {
    const parfumId = cartItem.parfum_id; 
    const token = localStorage.getItem('token');

    if (!parfumId) {
        console.error("Nincs parfum_id!");
        return;
    }

    this.http.delete(`http://localhost:3000/cart/${parfumId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.parfum_id !== parfumId);
        this.snackBar.open('Tétel sikeresen törölve!', 'OK', { duration: 3000 });
      },
      error: (err) => {
        console.error('Hiba a kosár törlésekor:', err);
        this.snackBar.open('Hiba történt a törlés során!', 'Bezár', { duration: 3000 });
      }
    });
  }

  getTotal() {
    return this.cartItems.reduce((acc, item: any) => {
      const ar = item.perfume?.price || item.ar || 0; 
      const mennyiseg = item.mennyiseg || 1;
      return acc + (ar * mennyiseg);
    }, 0);
  }

  close() {
    this.dialogRef.close();
  }
}
