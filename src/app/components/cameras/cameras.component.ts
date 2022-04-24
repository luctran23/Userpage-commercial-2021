import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HomeComponent } from '../home/home.component';
import { Product } from '../../../models/product';
import { MessengerService } from '../../services/messenger.service';
import { Router } from '@angular/router';
import { CamerasService } from 'src/app/services/cameras.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {
  products: Product[];
  page: number = 1;
  
  constructor(
      private router: Router,
      private camerasService: CamerasService,
      ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void {
    this.camerasService.getAllItems().subscribe(data => this.products = data);
  }
  
  selectedProd(id: string) {
    this.router.navigate(['/cameras/', id]).then();
  }
}
