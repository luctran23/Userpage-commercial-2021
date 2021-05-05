import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from '../../services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {
  products: Product[];
  page: number = 1;
  
  constructor(private homeService: HomeService, private messengerService: MessengerService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void {
    this.homeService.getProducts().subscribe(products => this.products = products.filter(prod => prod.cate_id == "1"));
  }
  addPhoneToCart(phone) {
    if(this.products.find(prod => prod._id == phone._id).quantity == 0) {
      return;
    }
    this.messengerService.sendMessage(phone);
    this.products.find(prod => prod._id == phone._id).quantity--;

    this.homeService.updateProdQuantity(phone, phone.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
  }
  selectedProd(id: string) {
    this.router.navigate(['/product/', id]).then();
  }
}
