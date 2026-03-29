import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FormRoutingModule} from "../form/form-routing.module";


@NgModule({
    declarations: [
        ProductsComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,

        ProductsRoutingModule
    ],
    exports: [
        ProductsRoutingModule
    ]
})
export class ProductsModule {
}
