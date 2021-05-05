import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from '../../../models/user';
import { CheckoutService } from '../../services/checkout.service';
import { Bill } from '../../../models/bill';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from 'src/app/services/users.service';
import { BillsService } from 'src/app/services/bills.service';
import { map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any;
  newUser: User = {
    _id: "",
    name: "",
    email: "",
    address: "",
    phone: ""
  };
  userId = "";
  newBill: any = {
    _id: "",
    date: moment().format(),
    user_id: "1"
  }
  newBillDetail = {
    _id: "",
    bill_id: "",
    product_id: "",
    quantity: 0,
    price: 0
  }
  userForm: FormGroup;
  errorMessageCollection = {
    'name': {
      'required': 'Không được để trống họ tên',
      'minlength': 'Họ tên phải dài hơn 2 ký tự'
    },
    'email': {
      'required': 'Không được để trống email',
      'email': 'Định dạng email chưa đúng'
    },
    'address': {
      'required': 'Không được để trống địa chỉ'
    },
    'zipcode': {
      'required': 'Không được để trống zipcode'
    },
    'phone': {
      'required': 'Không được để trống điện thoại',
      'pattern': 'Định dạng số điện thoại chưa đúng'
    },
  }
  formErrors = {
    'name': '',
    'email': '',
    'address': '',
    'zipcode': '',
    'phone': ''
  }
  constructor(public cartService: CartService, private checkoutService: CheckoutService,
              private fb: FormBuilder,
              private router: Router,
              private usersService: UsersService,
              private billsService: BillsService,
              private toastr: ToastrService,
    ) { }
  
  

  ngOnInit(): void {
    this.products = this.cartService.cartItems;
    this.initializeForm();
    this.userForm.valueChanges.subscribe( (data) => {
      this.pushErrorsIntoFormErrors(this.userForm);
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }
  // push error into formErrors 
  pushErrorsIntoFormErrors(group: FormGroup = this.userForm) {
    Object.keys(group.controls).forEach( (key) => {
      const control = this.userForm.get(key);
      if(control instanceof FormGroup) {
        this.pushErrorsIntoFormErrors(control);
      }
      else {
        this.formErrors[key] = '';
        if (control && !control.valid && (control.touched || control.dirty)) {
          var messages = this.errorMessageCollection[key];
          for (var error in control.errors) {
            this.formErrors[key] += messages[error] + ' ';
          }
        }
      }
    });
  }


  TotalMoney(checkouts: any[]) {
    return checkouts.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  Order(name , email, address, phone) {
    if(this.products.length == 0) {
      this.toastr.error('Trong giỏ bạn chưa có sản phẩm nào', 'Lỗi')
      return;
    }
    if(this.userForm.status == 'INVALID') {
      this.toastr.error('Vui lòng nhập đúng thông tin', 'Lỗi')
      return;
    }
    this.newUser.name = name;
    this.newUser.email = email;
    this.newUser.address = address;
    this.newUser.phone = phone;

    this.newBill.prod_Ids = this.products.map(item => {
      item = {prod_id: item.prodId, quantity: item.quantity};
      return item;
    })
    
    this.usersService.createItem(this.newUser).pipe(
      map(user => {
        this.newBill.user_id = user._id;
        return user;
      }),
      mergeMap(user => this.billsService.createItem(this.newBill))
    ).subscribe();
    localStorage.removeItem('cart'); 
    this.router.navigate(['/successful']).then();
    
  }

}
