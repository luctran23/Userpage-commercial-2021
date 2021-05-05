import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
  products: Product[];
  page: number = 1;
  x : string = 'a';
  constructor(private homeService: HomeService, private messengerService: MessengerService, private router: Router) { 
    this.x = 'b';
  }
//1 23564
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void {
    this.homeService.getProducts().subscribe(products => {
      this.products = products.filter(prod => prod.cate_id == "2")
    });
  }

  addLaptopToCart(laptop) {
    if(this.products.find(prod => prod._id == laptop._id).quantity == 0) {
      return;
    }
    this.messengerService.sendMessage(laptop);
    // update quantity in database
    this.products.find(prod => prod._id == laptop._id).quantity--;
    this.homeService.updateProdQuantity(laptop, laptop.quantity).subscribe(() => {
      console.log("updated successfully! ");
    });
  }
  selectedProd(id: string) {
    this.router.navigate(['/product/', id]).then();
  }
}
