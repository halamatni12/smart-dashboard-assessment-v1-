import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckoutComponent } from './checkout';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../state/app.state';

describe('CheckoutComponent', () => {
  let fixture: ComponentFixture<CheckoutComponent>;
  let component: CheckoutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, RouterTestingModule, CommonModule, FormsModule],
      providers: [AppState]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
