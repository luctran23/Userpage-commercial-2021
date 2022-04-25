import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  thumbnails: any;
  products: any = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, 
    private messengerService: MessengerService,
    private router: Router,
    private homeService: HomeService,
    private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    this.getSpecificProduct();
    window.scrollTo(0, 0);
  }

  getSpecificProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    //this.productService.getProductById(id).subscribe(product => this.product = product);
    this.productsService.getAllItems().subscribe(data => {
      this.product = data.find(item => item._id == id)
      this.getReleventProds(this.product.cate_id);
    })
  }
  getReleventProds(id: string) {
    this.productsService.getSpecificItem(id).subscribe(data => {
      this.products = data.filter(item => item._id !== this.product._id).slice(0, 8);
      console.log("products: ", this.products);
    })
  }
  preview(mainImg, thumbImg) {
    mainImg.src = thumbImg.src;
  }
  increaseQuantity(quantity ) {
    if(quantity.value < this.product.quantity) {
      quantity.value++;
    } 
  }
  decreaseQuantity(quantity) {
    if(quantity.value > 1) {
      quantity.value--;
    }
  }
  addToCart(product, orderQuantity) {
    if(this.product.quantity == 0) {
      return;
    }
    for(var i = 0; i < +orderQuantity.value; i++ ){
      this.messengerService.sendMessage(product);

      this.product.quantity--;

    }
    this.homeService.updateProdQuantity(product, product.quantity).subscribe(() => {
      console.log("updated single product quantity successfully! ");
    });
  }
 
}
