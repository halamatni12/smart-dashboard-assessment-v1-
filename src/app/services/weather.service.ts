import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(private http: HttpClient) {}

 getWeatherByCoords(lat: number, lon: number): Observable<any> {
  const params = [
    `latitude=${lat}`,
    `longitude=${lon}`,
    `current=temperature_2m,apparent_temperature,relative_humidity_2m,weathercode,wind_speed_10m,surface_pressure`,
    `hourly=temperature_2m,weathercode,pressure_msl`,
    `daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset,weathercode`,
    `forecast_days=10`,
    `timezone=auto`,
  ].join('&');

  return this.http.get<any>(`${this.baseUrl}?${params}`);
}


 getWeather(city: string): Observable<any> {
  return new Observable((observer) => {
    fetch(`${this.geoUrl}?name=${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results?.length) throw new Error('City not found');
        const { latitude, longitude, name, country } = data.results[0];
        this.getWeatherByCoords(latitude, longitude).subscribe({
          next: (weather) => observer.next({ ...weather, name, country }),
          error: (err) => observer.error(err),
        });
      })
      .catch((err) => observer.error(err));
  });
}


  getMultipleCities(cities: { name: string; lat: number; lon: number }[]) {
    const requests = cities.map((city) =>
      this.http
        .get(
          `${this.baseUrl}?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weathercode&timezone=auto`
        )
        .pipe(
          map((res: any) => ({
            name: city.name,
            temp: res.current.temperature_2m,
            code: res.current.weathercode,
          }))
        )
    );
    return forkJoin(requests);
  }
}
