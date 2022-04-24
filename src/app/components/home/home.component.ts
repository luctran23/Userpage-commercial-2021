import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { PhonesService } from '../../services/phones.service';
import { LaptopsService } from '../../services/laptops.service';
import { CamerasService } from '../../services/cameras.service';
import { AccessoriesService } from '../../services/accessories.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  page: number = 1;
  phones = [];
  laptops = [];
  cameras = [];
  accessories = [];
  searchText = '';
  prodForSearch = [];
  constructor(
    private router: Router,
    private messengerService: MessengerService,
    public cartService: CartService,
    private productsService: ProductsService,
    private phonesService: PhonesService,
    private laptopsService: LaptopsService,
    private camerasService: CamerasService,
    private accessoriesService: AccessoriesService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    window.scrollTo(0, 0);
    this.messengerService.currentMessage.subscribe(message => {
      this.searchText = message;
      if (this.searchText !== "message") {
        this.products = this.prodForSearch.filter(item => item.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
      }
    });
    console.log("search text: ", this.searchText);
  }
  getProducts(): void {
    this.phonesService.getAllItems().subscribe(data => {
      this.phones = data;
    });
    this.laptopsService.getAllItems().subscribe(data => {
      this.laptops = data;
    })
    this.camerasService.getAllItems().subscribe(data => {
      this.cameras = data;
    })
    this.accessoriesService.getAllItems().subscribe(data => {
      this.accessories = data;
    })
    this.productsService.getAllItems().subscribe(data => {
      this.products = data;
      this.products.map(item => {
        if(item.cate_id == "6083448040ae0b04983e8872") {
          item.url = "laptops";
        }
        if(item.cate_id == "6083448c40ae0b04983e8873") {
          item.url = "cameras";
        }
        if(item.cate_id == "6083449240ae0b04983e8874") {
          item.url = "accessories";
        }
        if(item.cate_id == "6089e750b6527c06147d7c74") {
          item.url = "phones";
        }
        if(item)
        return item;
      });
      this.prodForSearch = this.products;
      console.log("products home: ", this.products);
    })
  }
}
