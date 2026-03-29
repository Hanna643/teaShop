import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {ProductService} from "./shared/services/product.service";
import {HttpClientModule} from "@angular/common/http";
import { TruncatePipe } from './shared/pipe/truncate.pipe';
import {ProductsModule} from "./views/products/products.module";
import {HomeModule} from "./views/home/home.module";
import {FormModule} from "./views/form/form.module";
import {SharedModule} from "./shared/shared.module";




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsModule,
    HomeModule,
    FormModule,
    SharedModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
