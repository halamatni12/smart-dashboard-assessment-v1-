import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../../state/app.state';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  appState = inject(AppState);
  router = inject(Router);

  customer = { name: '', email: '', phone: '' };
  address = { street: '', city: '', area: '', postal: '', zone: 'inside' };
  payment = 'cod';

  get checkoutItems() {
    return this.appState.checkoutItems();  
  }

  get subtotal() {
    return this.checkoutItems.reduce((s, i) => s + i.price * i.qty, 0);
  }

  get deliveryFee() {
    return this.address.zone === 'inside' ? 4 : 5;
  }

  get total() {
    return this.subtotal + this.deliveryFee;
  }

  confirmOrder() {
    if (!this.customer.name || !this.customer.phone) {
      alert('⚠️ Please fill in your name and phone number.');
      return;
    }

    const order = {
      customer: this.customer,
      address: this.address,
      payment: this.payment,
      items: this.checkoutItems,   
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      total: this.total,
      date: new Date().toLocaleString()
    };

    this.appState.addOrder(order);

    this.appState.removeCheckoutItems(this.checkoutItems);

    alert('✅ Order placed successfully!');
    this.router.navigate(['/profile']);
  }
}
