import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
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
  }

  getProducts():void {
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
    })
  }

  
 // SEARCH FEATURE HOME PAGE

  
}
