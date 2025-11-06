import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/welcome']);
    }
  }

  async onLogin() {
    this.errorMessage = '';
    this.loading = true;

    if (!this.email || !this.password) {
      this.errorMessage = '⚠️ Please enter both email and password.';
      this.loading = false;
      return;
    }

    try {
      await this.authService.login(this.email, this.password); // ✅ من الـ service
      this.router.navigate(['/welcome']);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = '❌ No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = '⚠️ Incorrect password.';
      } else {
        this.errorMessage = '❌ Login failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}
