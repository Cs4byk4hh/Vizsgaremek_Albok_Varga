import { Injectable } from '@angular/core';
import { Perfume } from '../perfumes/perfumes.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Perfume[] = [];
  cartItems$ = new BehaviorSubject<Perfume[]>([]);

  constructor() { }

  addToCart(perfume: Perfume) {
    const existing = this.cartItems.find(item => item.id === perfume.id);
    if (existing) {
      (existing as any).quantity = ((existing as any).quantity || 1) + 1;
    } else {
      (perfume as any).quantity = 1;
      this.cartItems.push(perfume);
    }
    this.cartItems$.next([...this.cartItems]); 
  }

  getCart() {
    return [...this.cartItems];
  }

  removeFromCart(perfume: Perfume) {
    this.cartItems = this.cartItems.filter(item => item.id !== perfume.id);
    this.cartItems$.next([...this.cartItems]);
  }

  getTotal() {
    return this.cartItems.reduce((acc, item: any) => acc + item.price * (item.quantity || 1), 0);
  }
}