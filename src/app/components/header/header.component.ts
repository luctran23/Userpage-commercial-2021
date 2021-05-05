import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { Product } from '../../../models/product';
import { CartService } from '../../services/cart.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  cartItems: any;

  indexOnCart: number = 0;
  total: number;

  allProducts: any;
  product: any;

  options: string[] = ['Laptop', 'Điện thoại', 'Máy ảnh', 'Phụ kiện'];

  constructor(private messengerService: MessengerService,
              public cartService: CartService,
              private homeService: HomeService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    //this.cartService.getProdFromHomeComponent();
    this.homeService.getProducts().subscribe(products => this.allProducts = products);
  }
  
  TotalMoney(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  totalQuantity(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity, 0);
  }
  // WHENEVER CLICK sendKeyWord() is invoked
  sendKeyWord(item) {
    this.messengerService.changeBehaviorMessage(item);
  }
  
}
