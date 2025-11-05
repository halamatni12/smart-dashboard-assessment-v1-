import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchComponent } from './search';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [AppState, ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
