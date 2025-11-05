import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductsComponent } from './products';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AppState, ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should change slide when nextSlide() is called', () => {
    const initial = component.currentSlide;
    component.nextSlide();
    expect(component.currentSlide).not.toBe(initial);
  });

  it('should navigate to product details when viewDetails() called', () => {
    spyOn(router, 'navigate');
    component.viewDetails(123);
    expect(router.navigate).toHaveBeenCalledWith(['/products', 123]);
  });
});
