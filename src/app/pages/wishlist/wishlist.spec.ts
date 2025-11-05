import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WishlistComponent } from './wishlist';
import { RouterTestingModule } from '@angular/router/testing';
import { AppState } from '../../state/app.state';
import { CommonModule } from '@angular/common';

describe('WishlistComponent', () => {
  let fixture: ComponentFixture<WishlistComponent>;
  let component: WishlistComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistComponent, RouterTestingModule, CommonModule],
      providers: [AppState]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
