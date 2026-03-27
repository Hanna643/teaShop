import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: ProductType[] = [];
  constructor(private productService: ProductService) {
  }
  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
