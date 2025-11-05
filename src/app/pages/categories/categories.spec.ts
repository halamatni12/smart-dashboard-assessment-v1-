import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoriesComponent } from './categories';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { AppState } from '../../state/app.state';
import { Router } from '@angular/router';

describe('CategoriesComponent', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [ProductService, AppState]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
