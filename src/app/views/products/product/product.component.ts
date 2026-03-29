import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import { ProductType } from "../../../../types/product.type";
import { CartService } from "../../../shared/services/cart.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: ProductType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id']).subscribe({
          next: (product) => {
            if (product) {
              this.product = product;
            } else {
              this.router.navigate(['/']);
            }
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  addToCart(title: string): void {
    this.cartService.product = title;
    this.router.navigate(['/form']);
  }
}
