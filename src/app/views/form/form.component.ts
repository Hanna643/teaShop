import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CartService } from "../../shared/services/cart.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  checkoutForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^(?:\\+?)(?=\\d{11}$)\\d+')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ0-9\\s\\-/]+$')]],
    product: ['', [Validators.required]],
    comment: ['']
  });

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    if (this.cartService.product) {
      this.checkoutForm.patchValue({
        product: this.cartService.product
      });
    }
  }

  signIn(): void {

    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });

    if (this.checkoutForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;

      const formData = this.checkoutForm.value;

      this.http.post('https://testologia.ru/order-tea', formData).subscribe({
        next: (response: any) => {
          console.log('Ответ сервера:', response);

          if (response && response.success === 1) {
            this.submitSuccess = true;
            this.submitError = false;

            this.cartService.product = '';
          } else {

            this.submitError = true;
            this.submitSuccess = false;
          }

          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Ошибка при отправке заказа:', error);
          this.submitError = true;
          this.submitSuccess = false;
          this.isSubmitting = false;
        }
      });
    } else {
      console.log('Форма не отправлена');
    }
  }

  resetForm(): void {
    this.submitSuccess = false;
    this.submitError = false;
    this.checkoutForm.reset();
    this.isSubmitting = false;
  }
}
