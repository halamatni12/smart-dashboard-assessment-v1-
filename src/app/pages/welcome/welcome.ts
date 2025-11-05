import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css'],
})
export class WelcomeComponent implements OnInit {
  city = signal('Your Location');
  tempC = signal<number | null>(null);
  condition = signal<'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm'>('Clear');
  greetingMessage = '';
  quoteMessage = '';

  constructor(
    private router: Router,
    private weather: WeatherService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.setGreeting();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => this.loadWeather(coords.latitude, coords.longitude),
        () => this.loadWeatherByCity('Beirut')
      );
    } else this.loadWeatherByCity('Beirut');
  }

  private setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greetingMessage = 'Good Morning';
      this.quoteMessage = 'Start fresh and own the day ☀️';
    } else if (hour < 18) {
      this.greetingMessage = 'Good Afternoon';
      this.quoteMessage = 'Keep the energy flowing ⚡';
    } else {
      this.greetingMessage = 'Good Evening';
      this.quoteMessage = 'Relax and recharge 🌙';
    }
  }

  private loadWeather(lat: number, lon: number) {
    this.weather.getWeatherByCoords(lat, lon).subscribe((data: any) => {
      const c = data.current;
      this.city.set(data.city || 'Your Location');
      this.tempC.set(Math.round(c.temperature_2m));
      this.condition.set(this.mapWeather(c.weathercode));
    });
  }

  private loadWeatherByCity(city: string) {
    this.weather.getWeather(city).subscribe((data: any) => {
      const c = data.current;
      this.city.set(data.city || city);
      this.tempC.set(Math.round(c.temperature_2m));
      this.condition.set(this.mapWeather(c.weathercode));
    });
  }

  private mapWeather(code: number): any {
    if (code === 0) return 'Clear';
    if ([1, 2, 3, 45, 48].includes(code)) return 'Clouds';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 86) return 'Snow';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Clouds';
  }
goToWeather() {
  this.router.navigate(['/weather/dashboard']);
}

  goToProducts() { this.router.navigate(['/products']); }
}
