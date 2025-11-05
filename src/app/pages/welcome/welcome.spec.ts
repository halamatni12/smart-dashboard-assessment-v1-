import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../core/auth.service';
import { of } from 'rxjs';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let weatherSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    weatherSpy = jasmine.createSpyObj('WeatherService', ['getWeather', 'getWeatherByCoords']);
    weatherSpy.getWeather.and.returnValue(of({ current: { temperature_2m: 20, weathercode: 0 } }));

    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: WeatherService, useValue: weatherSpy },
        { provide: AuthService, useValue: { displayName: () => 'Hala' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set greeting message correctly', () => {
    component['setGreeting']();
    expect(component.greetingMessage.length).toBeGreaterThan(0);
  });

  it('should navigate to dashboard on goToWeather()', () => {
    component.goToWeather();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
