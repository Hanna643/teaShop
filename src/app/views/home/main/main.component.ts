import {Component, AfterViewInit, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, timer, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

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

  @ViewChild('teaPopup') teaPopupTemplate!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  constructor(private router: Router, private modalService: NgbModal) {
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
    this.modalRef = this.modalService.open(this.teaPopupTemplate, {
      centered: true,
      // backdrop: 'static' // чтобы нельзя было закрыть кликом мимо (как у вас в коде)
    });
  }

  goToProducts(modal: any): void {
    if (modal) {
      modal.close();
    }
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}

