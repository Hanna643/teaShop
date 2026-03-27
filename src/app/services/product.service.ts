import { Injectable } from '@angular/core';
import {ProductType} from "../types/product.type";

@Injectable()
export class ProductService {

  private products: ProductType[] = [
    {
      "id": 1,
      "image": "http://testologia.ru/tea-images/product1.png",
      "title": "Английский Садовник",
      "price": 260,
      "description": "Настоящий английский садовник всегда за натуральность..."
    },
    {
      "id": 2,
      "image": "http://testologia.ru/tea-images/product2.png",
      "title": "Трое в Лодке",
      "price": 270,
      "description": "Настоящий английский садовник всегда за натуральность..."
    }
  ]

  constructor() { }

  getProducts(): ProductType[] {
    //ajax
    return this.products;
  }
   getProduct(id: number): ProductType | undefined {
    //ajax
    return this.products.find(item => (item.id === id));
  }

}
