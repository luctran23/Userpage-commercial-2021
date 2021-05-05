import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  quantityOrder;

  constructor() { }

  getProdFromHomeComponent(product) {
    if (this.cartItems.find(item => item.prodId == product._id) == undefined) {
      this.cartItems.push({ prodId: product._id, imgUrl: product.descriptionImages[0], prodName: product.name, quantity: product.orderQuantity, price: product.price, url: product.url });
    }
    else {
      this.cartItems.find(item => item.prodId == product._id).quantity += product.orderQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
