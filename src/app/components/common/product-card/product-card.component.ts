import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input() product!: ProductType;
  constructor() {
    this.product = {
      image: '',
      title: '',
      description: '',
      price: 0
    };
  }
  ngOnInit(): void {
  }

}
