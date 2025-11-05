import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AllProductsComponent } from './allproducts';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';

describe('AllProductsComponent', () => {
  let fixture: ComponentFixture<AllProductsComponent>;
  let component: AllProductsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [AppState, ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
