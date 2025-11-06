import { Component, OnInit, signal, computed } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, DatePipe, NgClass } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, DatePipe, NgClass,FormsModule,RouterModule,],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  city = signal('—');
  temperature = signal(0);
  feelsLike = signal(0);
  humidity = signal(0);
  windSpeed = signal(0);
  sunrise = signal('');
  sunset = signal('');
  condition = signal('Clear');
  uvIndex = signal(0);
  chanceOfRain = signal(0);

  hourlyForecast = signal<any>({ time: [], temperature_2m: [], weathercode: [] });
  dailyForecast = signal<any>({
    time: [],
    temperature_2m_min: [],
    temperature_2m_max: [],
    weathercode: [],
  });

  otherCitiesData = signal<any[]>([]);
  bgUrl = signal("url('assets/images/default.jpg')");
  overlayMode = signal('overlay-dark');
  loading = signal(false);

  searchQuery: string = '';
  showSuggestions = signal(false);

  userName = computed(() => this.auth.displayName());

  constructor(private weatherService: WeatherService, public auth: AuthService) {}

  ngOnInit() {
    this.loading.set(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => this.loadByCoords(coords.latitude, coords.longitude),
        () => {
          this.onSearch('Beirut');
          this.loading.set(false);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      this.onSearch('Beirut');
      this.loading.set(false);
    }

    const cities = [
      { name: 'Beirut', lat: 33.8938, lon: 35.5018 },
      { name: 'Dubai - UAE', lat: 25.276987, lon: 55.296249 },
      { name: 'USA (NY)', lat: 40.7128, lon: -74.006 },
      { name: 'China (Beijing)', lat: 39.9042, lon: 116.4074 },
      { name: 'Canada (Toronto)', lat: 43.6532, lon: -79.3832 },
    ];
    this.weatherService.getMultipleCities(cities).subscribe((rows) => {
      const list = rows.map((c) => ({
        name: c.name,
        temp: Math.round(c.temp),
        icon: this.getWeatherIcon(c.code),
        condition: this.mapWeatherCode(c.code),
      }));
      this.otherCitiesData.set(list);
    });
  }

  private getCityNameFromCoords(lat: number, lon: number): Promise<string> {
    return fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`)
      .then((res) => res.json())
      .then((data) => data?.results?.[0]?.name || 'Your Location')
      .catch(() => 'Your Location');
  }

  private async loadByCoords(lat: number, lon: number) {
    try {
      const detectedCity = await this.getCityNameFromCoords(lat, lon);
      this.weatherService.getWeatherByCoords(lat, lon).subscribe((data) => {
        this.applyWeather(data, detectedCity || 'Your Location');
        this.loading.set(false);
      });
    } catch {
      this.onSearch('Beirut');
      this.loading.set(false);
    }
  }

  onSearch(city: string) {
    if (!city) return;
    this.weatherService.getWeather(city).subscribe((data) => {
      this.applyWeather(data, data.name ?? city);
      this.loading.set(false);
    });
  }

  filteredSuggestions() {
    const query = this.searchQuery.toLowerCase();
    const allCities = ['Beirut', 'Dubai', 'London', 'Paris', 'New York', 'Tokyo', 'Cairo'];
    if (!query) return [];
    return allCities.filter((c) => c.toLowerCase().includes(query));
  }

  selectSuggestion(city: string) {
    this.searchQuery = city;
    this.showSuggestions.set(false);
    this.onSearch(city);
  }

  private applyWeather(data: any, name: string) {
    console.log('🌤️ Full API data:', data);

    const c = data.current;
    this.city.set(name);
    this.temperature.set(c.temperature_2m);
    this.feelsLike.set(c.apparent_temperature);
    this.humidity.set(c.relative_humidity_2m);
    this.windSpeed.set(c.wind_speed_10m);
    this.sunrise.set(data.daily.sunrise[0]);
    this.sunset.set(data.daily.sunset[0]);
    this.condition.set(this.mapWeatherCode(c.weathercode));
    this.updateBackground(c.weathercode);
    this.dailyForecast.set(data.daily);
    this.uvIndex.set(data.daily.uv_index_max?.[0] ?? 0);
    this.chanceOfRain.set(data.daily.precipitation_probability_max?.[0] ?? 0);

    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const idx = data.hourly.time
      .map((t: string, i: number) => ({ t, i }))
      .filter(({ t }: { t: string; i: number }) => {
        const d = new Date(t);
        return d >= now && d <= nextDay;
      })
      .map(({ i }: { t: string; i: number }) => i);

    this.hourlyForecast.set({
      time: idx.map((i: number) => data.hourly.time[i]),
      temperature_2m: idx.map((i: number) => data.hourly.temperature_2m[i]),
      weathercode: idx.map((i: number) => data.hourly.weathercode[i]),
    });

    this.updateWeatherData(data);
  }

  mapWeatherCode(code: number): string {
    if (code === 0) return 'Clear';
    if ([1, 2, 3].includes(code)) return 'Clouds';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 86) return 'Snow';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Clouds';
  }

  updateBackground(code: number) {
    const cond = this.mapWeatherCode(code);
    const staticBg: Record<string, string> = {
      Clear: "url('/images/sunny.jpg')",
      Clouds: "url('/images/cloudy.jpg')",
      Rain: "url('/images/rainy.jpg')",
      Snow: "url('/images/snowy.jpg')",
      Thunderstorm: "url('/images/storm.jpg')",
      Default: "url('/images/default.jpg')",
    };
    const animatedBg: Record<string, string> = {
      Clear: "url('/images/sunnydash.gif')",
      Clouds: "url('/images/cloudydash.gif')",
      Rain: "url('/images/rainydash.gif')",
      Snow: "url('/images/snowydash.gif')",
      Thunderstorm: "url('/images/storm.jpg')",
      Default: "url('/images/default.jpg')",
    };
    const useAnimated = ['Rain', 'Clouds', 'Clear', 'Snow'].includes(cond);
    this.bgUrl.set(useAnimated ? animatedBg[cond] : staticBg[cond]);

    this.overlayMode.set(
      ['Rain', 'Snow', 'Thunderstorm'].includes(cond)
        ? 'overlay-light'
        : 'overlay-dark'
    );
  }

  getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 86) return '❄️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '☁️';
  }

  calcTempBarPosition(min: number): number {
    const minGlobal = Math.min(...this.dailyForecast().temperature_2m_min);
    const maxGlobal = Math.max(...this.dailyForecast().temperature_2m_max);
    return ((min - minGlobal) / (maxGlobal - minGlobal)) * 100;
  }

  calcTempBarWidth(min: number, max: number): number {
    const minGlobal = Math.min(...this.dailyForecast().temperature_2m_min);
    const maxGlobal = Math.max(...this.dailyForecast().temperature_2m_max);
    return ((max - min) / (maxGlobal - minGlobal)) * 100;
  }

  summaryText(): string {
    const cond = this.condition();
    const wind = this.windSpeed();
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;

    if (isNight) {
      if (cond === 'Clear') return `Clear skies tonight. Winds up to ${wind} km/h.`;
      if (cond === 'Clouds') return `Partly cloudy tonight. Light breeze ${wind} km/h.`;
      if (cond === 'Rain') return `Rain expected tonight. Wind gusts up to ${wind} km/h.`;
      if (cond === 'Snow') return `Snowy conditions overnight. Winds around ${wind} km/h.`;
      if (cond === 'Thunderstorm') return `Thunderstorms possible tonight. Stay safe.`;
    } else {
      if (cond === 'Clear') return `Sunny conditions will continue all day. Winds up to ${wind} km/h.`;
      if (cond === 'Clouds') return `Cloudy with occasional sun breaks. Winds near ${wind} km/h.`;
      if (cond === 'Rain') return `Rain showers expected today. Winds reaching ${wind} km/h.`;
      if (cond === 'Snow') return `Cold and snowy today. Winds around ${wind} km/h.`;
      if (cond === 'Thunderstorm') return `Stormy weather likely today. Gusts up to ${wind} km/h.`;
    }
    return `Mild weather today with winds about ${wind} km/h.`;
  }

  logout() {
    this.auth.logout();
  }

  altitude = signal<number>(0);
  pressure = signal<number>(0);

  updateWeatherData(data: any) {
    this.altitude.set(data.elevation ?? 0);
    this.pressure.set(
      data.current?.surface_pressure ??
        data.current?.pressure_msl ??
        data.hourly?.pressure_msl?.[0] ??
        0
    );
  }

  getPressureColor(): string {
    const p = this.pressure() / 33.8639; 
    if (p < 29.5) return '#ff7675';
    if (p > 30.5) return '#74b9ff'; 
    return '#55efc4'; 
  }

  getPressureRotation(): string {
    const p = this.pressure();
    const pInHg = p / 33.8639;
    const min = 28.5;
    const max = 31.0;
    const clamped = Math.min(Math.max(pInHg, min), max);
    const percent = (clamped - min) / (max - min);
    const angle = -90 + percent * 180;
    return `rotate(${angle}deg)`;
  }
}
