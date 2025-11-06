import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../../services/weather.service';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';
  weatherData: any = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private renderer: Renderer2,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.detectLocation();
  }

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        this.weatherService.getWeatherByCoords(latitude, longitude).subscribe((data) => {
          this.weatherData = {
            city: data.city,
            temp: data.current.temperature_2m,
            condition: this.mapWeatherCode(data.current.weather_code),
          };
        });
      });
    }
  }

  private mapWeatherCode(code: number): string {
    if ([0].includes(code)) return 'Clear';
    if ([1, 2, 3, 45, 48].includes(code)) return 'Cloudy';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy';
    if ([95, 96, 99].includes(code)) return 'Stormy';
    return 'Clear';
  }

  async onSignup() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = '⚠️ Passwords do not match.';
      this.loading = false;
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      await updateProfile(user.user, { displayName: this.name });
      this.successMessage = '🎉 Account created successfully!';
      this.router.navigate(['/welcome']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = '⚠️ Email already registered.';
      } else {
        this.errorMessage = '❌ Signup failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}
