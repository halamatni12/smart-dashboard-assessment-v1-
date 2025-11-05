import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CartComponent } from './cart';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/app.state';

describe('CartComponent', () => {
  let fixture: ComponentFixture<CartComponent>;
  let component: CartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, CommonModule, RouterTestingModule],
      providers: [AppState]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
