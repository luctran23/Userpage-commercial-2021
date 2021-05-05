import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from 'src/models/user';
import { Observable, of, using } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Bill } from '../../models/bill';
import { BillDetail } from '../../models/bill-detail';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private userURL = "http://localhost:3000/api/users";
  private billURL = "http://localhost:3000/api/bills";
  private billDetailURL = "http://localhost:3000/api/bill_detail";
  constructor(private http: HttpClient) { }

  postUser(newUser: User ): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.userURL, newUser, httpOptions).pipe(
      tap((user: User) => console.log(`Inserted a user=  ${JSON.stringify(user)}`)),
      catchError(error => of(newUser))
    );
  }
  postBill(newBill: Bill): Observable<Bill> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Bill>(this.billURL, newBill, httpOptions).pipe(
      tap((bill: Bill) => console.log(`Inserted a bill=  ${JSON.stringify(bill)}`)),
      catchError(error => of(newBill))
    );
  }
  postBillDetail(newBillDetail: BillDetail): Observable<BillDetail> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<BillDetail>(this.billDetailURL, newBillDetail, httpOptions).pipe(
      tap((billDetail: BillDetail) => console.log(`Inserted a bill details= ${JSON.stringify(billDetail)}`)),
      catchError(error => of(newBillDetail))
    );
  } 
}
