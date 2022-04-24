import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { HomeService } from '../../services/home.service';
import { MessengerService } from '../../services/messenger.service';
import { Router } from '@angular/router';
import { PhonesService } from 'src/app/services/phones.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {
  products = [];
  page: number = 1;
  
  constructor(private router: Router,
    private phonesService: PhonesService,
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void {
    this.phonesService.getAllItems().subscribe(data => {
      this.products = data;
    });
  }
  
  selectedProd(id: string) {
    this.router.navigate(['/phones/', id]).then();
  }
}
