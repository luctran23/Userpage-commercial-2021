import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessfulComponent } from './components/successful/successful.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { PhonesComponent } from './components/phones/phones.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { LaptopDetailComponent } from './components/laptop-detail/laptop-detail.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';
import { CameraDetailComponent } from './components/camera-detail/camera-detail.component';
import { AccessoryDetailComponent } from './components/accessory-detail/accessory-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'succesful', component: SuccessfulComponent },
  { path: 'laptops', component: LaptopsComponent },
  { path: 'laptops/:id', component: LaptopDetailComponent },
  { path: 'phones', component: PhonesComponent },
  { path: 'phones/:id', component: PhoneDetailComponent },
  { path: 'cameras', component: CamerasComponent },
  { path: 'cameras/:id', component: CameraDetailComponent },
  { path: 'accessories', component: AccessoriesComponent },
  { path: 'accessories/:id', component: AccessoryDetailComponent },
  { path: 'successful', component: SuccessfulComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
