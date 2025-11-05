import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Auth } from '@angular/fire/auth';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authMock: jasmine.SpyObj<Auth>;

  beforeEach(async () => {
    authMock = jasmine.createSpyObj('Auth', [], { currentUser: null });

    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [{ provide: Auth, useValue: authMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if email empty', async () => {
    component.email = '';
    await component.resetPassword();
    expect(component.errorMessage).toContain('Please enter your email');
  });
});
