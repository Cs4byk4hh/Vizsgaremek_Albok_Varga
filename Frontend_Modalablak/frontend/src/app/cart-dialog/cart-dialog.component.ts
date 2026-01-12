import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Perfume } from '../perfumes/perfumes.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  imports: [CommonModule, MatDialogModule, MatButtonModule, HttpClientModule, MatListModule],
  standalone: true
})
export class CartDialogComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:3000/cart/get', { headers })
      .subscribe({
        next: (res) => this.cartItems = res,
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

  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index >= 0) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotal() {
    return this.cartItems.reduce((acc, item: any) => acc + item.ar * (item.mennyiseg || 1), 0);
  }

  close() {
    this.dialogRef.close();
  }
}