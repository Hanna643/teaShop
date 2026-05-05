import { Component, OnInit } from '@angular/core';
import { ProductType } from "../../../../types/product.type";
import { ProductService } from "../../../shared/services/product.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  public filteredProducts: ProductType[] = [];
  public searchQuery: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Ошибка загрузки товаров:', err);
      }
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.applyFilter();
    });
  }

  private applyFilter(): void {
    if (!this.products.length) return;
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }
}
