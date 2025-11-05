import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../state/app.state';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  private auth = inject(Auth);
  private appState = inject(AppState);
  private router = inject(Router);

  userEmail: string | null = null;
  userName: string | null = null;
  userPhone: string | null = null;

  orders = this.appState.orders; 

  constructor() {
 
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userEmail = user.email;
        this.userName = user.displayName || 'User';
        this.userPhone = user.phoneNumber || '';
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  get hasOrders() {
    return this.orders().length > 0;
  }

  async logout() {
    await signOut(this.auth);
    this.appState.orders.set([]); 
    this.router.navigate(['/login']);
  }
}
