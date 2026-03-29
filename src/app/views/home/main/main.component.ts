import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, timer, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

declare var $: any;
declare var WOW: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private popupSubscription?: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    new WOW({
      animateClass: 'animate__animated',
    }).init();

    const popupObservable: Observable<number> = timer(10000);

    this.popupSubscription = popupObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showPopup();
      });
  }

  ngAfterViewInit(): void {
    $('.single-item').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: '<button type="button" class="slick-prev border border-primary rounded-circle bg-white z-1 d-flex align-items-center justify-content-center p-3 ms-5"></button>',
      nextArrow: '<button type="button" class="slick-next border border-primary rounded-circle bg-white z-1 d-flex align-items-center justify-content-center p-3 me-5"></button>'
    });

    $("#accordion").accordion({
      icons: false,
      collapsible: true,
      activate: function (event: any, ui: any) {
        $(".ui-accordion-header").each(function (this: any) {
          const $icon = $(this).find(".accordion-icon");
          $icon.toggleClass("fa-angle-up", $(this).hasClass("ui-accordion-header-active"));
          $icon.toggleClass("fa-angle-down", !$(this).hasClass("ui-accordion-header-active"));
        });
      }
    });

    $("#accordion h3").addClass("bg-primary bg-gradient text-white rounded p-4 mb-3 border border-0 d-flex justify-content-between align-items-center");
    $("#accordion div").addClass("border border-0 ps-4");
    $("#accordion i").addClass('fa-lg pt-2');

    $('.product-img').magnificPopup({
      type: 'image'
    });

    $('#btnOrder, .btnCard').addClass('hvr-sweep-to-right');
  }

  private showPopup(): void {
    const modalElement = document.getElementById('teaCollectionPopup');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  goToProducts(): void {
    const modalElement = document.getElementById('teaCollectionPopup');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
