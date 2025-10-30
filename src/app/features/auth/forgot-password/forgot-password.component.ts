import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: Auth) {}

  async resetPassword() {
    this.loading = true;
    this.errorMessage = '';

    if (!this.email) {
      this.errorMessage = '⚠️ Please enter your email address.';
      this.loading = false;
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      alert('✅ Password reset link sent! Check your inbox.');
    } catch (err: any) {
      this.errorMessage = '❌ ' + (err.message || 'Something went wrong.');
    } finally {
      this.loading = false;
    }
  }
}
