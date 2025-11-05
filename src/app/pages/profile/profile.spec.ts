import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProfileComponent } from './profile';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AppState } from '../../state/app.state';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

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
      imports: [ProfileComponent, RouterTestingModule, CommonModule],
      providers: [
        AppState,
        { provide: Auth, useValue: mockAuth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
