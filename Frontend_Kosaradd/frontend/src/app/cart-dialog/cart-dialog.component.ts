import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Perfume } from '../perfumes/perfumes.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  standalone: true
})
export class CartDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cartItems: Perfume[],
    private dialogRef: MatDialogRef<CartDialogComponent>
  ) { }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index >= 0) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotal() {
  return this.cartItems.reduce((acc, item: any) => acc + item.price * (item.quantity || 1), 0);
}


  close() {
    this.dialogRef.close();
  }
}