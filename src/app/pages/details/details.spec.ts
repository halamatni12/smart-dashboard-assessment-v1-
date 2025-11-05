import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from './details';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/app.state';

describe('DetailsComponent', () => {
  let fixture: ComponentFixture<DetailsComponent>;
  let component: DetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, RouterTestingModule, HttpClientTestingModule, CommonModule],
      providers: [AppState]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
