import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LaptopsService extends BaseApiService{

  constructor(http: HttpClient) {
    super(http)
  }
  changeUrl() {
    return 'laptops';
  }
}