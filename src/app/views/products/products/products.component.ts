import { Component, OnInit } from '@angular/core';
import { ProductType } from "../../../../types/product.type";
import { ProductService } from "../../../shared/services/product.service";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки товаров:', err);
      }
    });
  }
}
