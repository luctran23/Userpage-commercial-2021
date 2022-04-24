import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { LaptopsService } from 'src/app/services/laptops.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
  products = [];
  page: number = 1;
  constructor(private homeService: HomeService,
     private messengerService: MessengerService,
      private router: Router,
      private laptopsService: LaptopsService,
      ) { 
  }
//1 23564
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void {
   this.laptopsService.getAllItems().subscribe(data => {
     this.products = data;
   });
  }

  selectedProd(id: string) {
    this.router.navigate(['/laptops/', id]).then();
  }
}
