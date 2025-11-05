import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from '@angular/fire/auth';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  const mockAuth = {
    onAuthStateChanged: (observer: any, errorFn?: any, completeFn?: any) => {
      if (typeof observer === 'function') {
        observer(null);
      } else if (observer && typeof observer.next === 'function') {
        observer.next(null);
      }
      return () => {};
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, CommonModule, FormsModule, RouterTestingModule],
      providers: [{ provide: Auth, useValue: mockAuth }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show error if email or password missing', async () => {
    component.email = '';
    component.password = '';
    await component.onLogin();
    expect(component.errorMessage).toContain('Please enter both email and password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
