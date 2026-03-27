import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./components/pages/main/main.component";
import {ProductsComponent} from "./components/pages/products/products.component";
import {FormComponent} from "./components/pages/form/form.component";
import {ProductComponent} from "./components/pages/product/product.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'form', component: FormComponent},
  {path: 'products/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
