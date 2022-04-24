import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { AccessoriesService } from 'src/app/services/accessories.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  products: Product[];
  page: number = 1;

  constructor(
    private router: Router,
    private accessoriesService: AccessoriesService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.accessoriesService.getAllItems().subscribe(data => this.products = data);
  }
  
  selectedProd(id: string) {
    this.router.navigate(['/accessories/', id]).then();
  }
}
