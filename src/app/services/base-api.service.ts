import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  // protected baseUrl = 'http://192.168.1.162:3000/';
  protected baseUrl = 'http://localhost:3001/';
  protected get rootUrl() {
    return this.baseUrl +'api/' + this.changeUrl();
}
  protected http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }
  abstract changeUrl();

  getAllItems(): Observable<any> {
    return this.http.get<any>(this.rootUrl);
  }
  getSpecificItem(id: any): Observable<any> {
    return this.http.get<any>(this.rootUrl + `/${id}`)
  }
  createItem(data: any): Observable<any> {
    return this.http.post<any>(this.rootUrl, data);
  }
  updateItem(data:any): Observable<any> {
    return this.http.patch<any>(this.rootUrl + `/${data._id}`, data);
  }
  deleteItem(data: any) : Observable<any> {
    return this.http.delete<any>(this.rootUrl + `/${data._id}`, data);
  }
}
