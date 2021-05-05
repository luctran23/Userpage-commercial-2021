import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subject = new Subject();
  private messageSource = new BehaviorSubject<string>("message");
  private singleProductQuantity = new BehaviorSubject<number>(1);
  
  currentMessage = this.messageSource.asObservable();
  currentProductQuantity = this.singleProductQuantity.asObservable();

  constructor() { }

  sendMessage(product) {
    this.subject.next(product);
  }
  
  getMessage() {
    return this.subject.asObservable();
  }

  changeBehaviorMessage(message: string) {
    this.messageSource.next(message);
  }
  changeCurrentProductQuantity(quantity: number) {
    this.singleProductQuantity.next(quantity);
  }
}
