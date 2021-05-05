import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  private productsURL = "http://localhost:3000/api/products";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL).pipe(
      tap(result => console.log(`Products= ${JSON.stringify(result)}`)),
      catchError(error => of([]))
    );
  }
  
  updateProdQuantity(product, quantity): Observable<any> {
    const updateURL  = `${this.productsURL}/${product._id}`;
    
    console.log("updating product quantity...");
    return this.http.patch(updateURL, {quantity: quantity}).pipe(
      tap(result => console.log(`Updated product= ${JSON.stringify(result)}`)),
      catchError(error => of([]))
    );
  }
}
