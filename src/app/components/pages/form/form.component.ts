import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CartService} from "../../../services/cart.service";

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
  })

  constructor(private fb: FormBuilder, private cartService: CartService) {

  }

  ngOnInit(): void {
    // Получаем название товара из сервиса корзины и устанавливаем в поле product
    if (this.cartService.product) {
      this.checkoutForm.patchValue({
        product: this.cartService.product
      });
    }
  }

  signIn(): void {
    // Помечаем все поля как touched
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });

    if (this.checkoutForm.valid) {
      console.log('Форма отправлена:', this.checkoutForm.value);
      // Здесь логика отправки данных

      // Показываем модальное окно
      const modalElement = document.getElementById('successPopup');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }

      this.checkoutForm.reset();
    } else {
      console.log('Форма не отправлена');
    }
  }
}
