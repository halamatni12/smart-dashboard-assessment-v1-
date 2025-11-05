import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../core/auth.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let weatherSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    weatherSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);
    weatherSpy.getWeather.and.returnValue(of({ current: { temperature_2m: 22, weathercode: 0 } }));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: WeatherService, useValue: weatherSpy },
        { provide: AuthService, useValue: { displayName: () => 'Hala' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default city as —', () => {
    expect(component.city()).toBe('—');
  });
});
