import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { catchError,tap } from 'rxjs/operators';
import { Thumbnail } from '../../models/thumbnail';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private thumbnailURL = "http://localhost:3000/api/thumbnails";
  constructor(private http: HttpClient) { }
  
  getProductById(id: string): Observable<any> {
    return this.http.get<Product>(`http://localhost:3000/api/products/${id}`).pipe(
      tap(selectedProduct => console.log(`Selected movie= ${JSON.stringify(selectedProduct)}`)),
      catchError(error => of(id))
    );
  }
  getThumbnails(): Observable<Thumbnail[]> {
    return this.http.get<Thumbnail[]>(this.thumbnailURL).pipe(
      tap(results => console.log(`Products= ${JSON.stringify(results)}`)),
      catchError(error => of([]))
    );
  }
}
