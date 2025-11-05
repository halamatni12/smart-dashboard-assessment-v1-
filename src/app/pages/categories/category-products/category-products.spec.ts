import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryProductsComponent } from './category-products';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '../../../state/app.state';
import { ProductService } from '../../../services/product.service';

describe('CategoryProductsComponent', () => {
  let fixture: ComponentFixture<CategoryProductsComponent>;
  let component: CategoryProductsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoryProductsComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AppState, ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
