import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { MessengerService } from '../../services/messenger.service';
import { NgAnalyzeModulesHost } from '@angular/compiler';
import { AccessoriesService } from 'src/app/services/accessories.service';
import { map, mergeMap } from 'rxjs/operators';
import { CamerasService } from 'src/app/services/cameras.service';
import { LaptopsService } from 'src/app/services/laptops.service';
import { PhonesService } from 'src/app/services/phones.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  singleProdQuantity: any;
  allProducts: any;
  product: any;

  constructor(public cartService: CartService,
    private homeService: HomeService,
    private messengerService: MessengerService,
    private accessoriesService: AccessoriesService,
    private camerasService: CamerasService,
    private laptopsService: LaptopsService,
    private phonesService: PhonesService
  ) { }

  ngOnInit(): void {
    this.products = this.cartService.cartItems;
    this.getSingleProdQty();
    this.homeService.getProducts().subscribe(products => this.allProducts = products);
  }
  TotalMoney(carts: any[]) {
    return carts.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  increaseQuantity(productId, quantity) {
    var aProd = this.allProducts.find(item => item._id == productId);
    if (aProd.quantity > 0) {
      this.products.find(item => item.prodId == productId).quantity++;
      aProd.quantity--;
    }
    else {
      alert('Sản phẩm đã hết hàng')
    }
    localStorage.setItem('cart', JSON.stringify(this.products));
    this.homeService.updateProdQuantity(aProd, aProd.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
  }
  decreaseQuantity(producId) {
    if (this.products.find(item => item.prodId == producId).quantity > 1) {
      this.products.find(item => item.prodId == producId).quantity--;
    }
  }
  deleteCartItem(cartCollection: any, product: any) {
    if (confirm('Xóa sản phẩm khỏi giỏ hàng')) {
      this.products = cartCollection.filter(item => item.prodId !== product.prodId);
      localStorage.setItem('cart', JSON.stringify(this.products));
      location.reload();
      if(product.url.includes('accessories')) {
        this.accessoriesService.getSpecificItem(product.prodId).pipe(
          map(prod => {
            this.product = prod
            this.product.quantity += product.quantity;
            return prod;
          }),
          mergeMap(product => this.accessoriesService.updateItem(this.product))
        ).subscribe();
      }
      if(product.url.includes('cameras')) {
        this.camerasService.getSpecificItem(product.prodId).pipe(
          map(prod => {
            this.product = prod
            this.product.quantity += product.quantity;
            return prod;
          }),
          mergeMap(product => this.camerasService.updateItem(this.product))
        ).subscribe();
      }
      if(product.url.includes('laptops')) {
        this.laptopsService.getSpecificItem(product.prodId).pipe(
          map(prod => {
            this.product = prod
            this.product.quantity += product.quantity;
            return prod;
          }),
          mergeMap(product => this.laptopsService.updateItem(this.product))
        ).subscribe();
      }
      if(product.url.includes('phones')) {
        this.phonesService.getSpecificItem(product.prodId).pipe(
          map(prod => {
            this.product = prod
            this.product.quantity += product.quantity;
            return prod;
          }),
          mergeMap(product => this.phonesService.updateItem(this.product))
        ).subscribe();
      }
    }
  }
  getSingleProdQty() {
    this.messengerService.currentProductQuantity.subscribe(quantity => {
      console.log('quantity=', quantity);
    });
  }

}