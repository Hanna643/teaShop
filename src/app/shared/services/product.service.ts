import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<ProductType | undefined> {
    return new Observable(observer => {
      this.getProducts().subscribe(products => {
        const product = products.find(item => item.id === id);
        observer.next(product);
        observer.complete();
      });
    });
  }
}
