import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessoriesService } from 'src/app/services/accessories.service';
import { CartService } from 'src/app/services/cart.service';
import { PromotionsService } from 'src/app/services/promotions.service';
import { RatesService } from 'src/app/services/rates.service';
import { CommentsService } from 'src/app/services/comments.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

@Component({
  selector: 'app-accessory-detail',
  templateUrl: './accessory-detail.component.html',
  styleUrls: ['./accessory-detail.component.css']
})
export class AccessoryDetailComponent implements OnInit {

  product: any;
  products = [];
  promotions = [];
  rates = [];
  commentss = [];
  parentComments = [];
  childComments = [];
  stars = [
    { name: 'one', index: 1 },
    { name: 'two', index: 2 },
    { name: 'three', index: 3 },
    { name: 'four', index: 4 },
    { name: 'five', index: 5 }
  ];
  isSendRate: boolean = false;
  isSendQuestion: boolean = false;
  isReplied: boolean = false;
  timeNow = new Date().getTime();
  yourQuestion = '';
  public form: FormGroup;

  constructor(
    private accessoriesService: AccessoriesService,
    private promotionsService: PromotionsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ratesService: RatesService,
    private commentsService: CommentsService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    this.accessoriesService.getSpecificItem(id).subscribe(data => {
      this.product = data;

    })
    this.getReleventProds(id);
    this.getPromotions(id);
    this.getRates(id);
    this.getComments(id);
  }
  getReleventProds(id: string) {
    this.accessoriesService.getAllItems().subscribe(data => {
      this.products = data.filter(element => element._id !== id)
    });
  }
  getPromotions(id: string) {
    this.promotionsService.getAllItems().subscribe(data => {
      this.promotions = data.filter(element => element.prod_id == id);
    })
  }
  getRates(id: string) {
    this.ratesService.getSpecificItem(id).subscribe(data => {
      this.rates = data;
    });
  }
  getComments(id: string) {
    this.commentsService.getSpecificItem(id).subscribe(data => {
      this.commentss = data;
      this.commentss.map(item => {
        var date = moment(item.time).valueOf();
        item.timeSince = this.getTimeSince(date);
        item.isReplied = false;
        return item;
      });
      this.parentComments = data.filter(item => item.parent_id == "0")
      this.childComments =  data.filter(item => item.parent_id !== "0")
    })
  }
  getTimeSince(date) {
    var seconds = (this.timeNow - date) / (1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
  }

  preview(mainImg, thumbImg) {
    mainImg.src = thumbImg.src;
  }
  increaseQuantity(quantity) {
    if (quantity.value < this.product.quantity) {
      quantity.value++;
    }
  }
  decreaseQuantity(quantity) {
    if (quantity.value > 1) {
      quantity.value--;
    }
  }
  addToCart(product, orderQuantity) {
    if (product.quantity == 0) {
      this.toastr.error('Sản phẩm tạm thời hết hàng', 'Thông báo');
      return;
    }
    product.orderQuantity = Number(orderQuantity);
    product.quantity -= Number(orderQuantity);
    this.accessoriesService.updateItem(product).subscribe();
    product.url = this.router.url;
    this.cartService.getProdFromHomeComponent(product);
    this.toastr.success('Thêm hàng vào giỏ thành công', 'Thông báo');
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  sendRate() {
    if (Number(this.form.value.rating) <= 0) {
      this.toastr.error('Đánh giá phải từ 1 sao trở lên!', 'Lỗi');
      return;
    }
    var obj = {
      prod_id: this.product._id,
      ratedValue: this.form.value.rating
    }
    this.ratesService.createItem(obj).subscribe(() => {
      this.toastr.success('Gửi đánh giá thành công', 'Thông báo');
      this.getRates(this.product._id);
      this.isSendRate = false;
    });
  }
  openSendYourRateDiv() {
    this.isSendRate = true;
  }
  sendQuestion(value) {
    if (value.length < 3) {
      this.toastr.error('Nội dung phải dài hơn 3 kí tự', 'Lỗi');
      return;
    }
    this.isSendQuestion = true;
    let question = {};
    this.openDialog(question, value, "0");
  }
  replyQuestion(value, item) {
    if (value.length < 3) {
      this.toastr.error('Nội dung phải dài hơn 3 kí tự', 'Lỗi');
      return;
    }
    let reply = {};
    this.openDialog(reply, value, item._id);

  }
  openDialog(item, value, pId): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      data: { prod_id: this.product._id, content: value, parent_id: pId,time: moment().format(),user_name: item.user_name, isAdmin: "false" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentsService.createItem(result).subscribe(() => {
          this.toastr.success('Gửi câu hỏi thành công', 'Thông báo');
          this.getComments(this.product._id);
        })
      }
    });
  }
  reply(comment) {
    this.commentss.map(item => {
      if (item._id == comment._id) {
        var date = moment(item.time).valueOf();
        item.timeSince = this.getTimeSince(date);
        item.isReplied = !item.isReplied;
      }
      return item;
    });
  }
}
