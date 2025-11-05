import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  appState = inject(AppState);
  router = inject(Router);

  cart = this.appState.cart;
  total = 0;

  private deleteModal: any;
  itemToDelete: any = null;

  ngOnInit() {
    this.updateTotal();
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal')!);
  }

  updateTotal() {
    this.total = this.cart()
      .filter(p => p.selected)
      .reduce((sum, p) => sum + p.qty * p.price, 0);
    this.appState.saveCart();
  }


  increaseQty(item: any) {
    item.qty++;
    this.updateTotal();
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
      this.updateTotal();
    }
  }

  confirmDelete(item: any) {
    this.itemToDelete = item;
    this.deleteModal.show();
  }

  deleteConfirmed() {
    this.appState.removeFromCart(this.itemToDelete);
    this.updateTotal();
    this.deleteModal.hide();
  }

  proceedToCheckout() {
    const selectedItems = this.cart().filter(p => p.selected);

    if (selectedItems.length === 0) {
      alert('Please select at least one product to proceed.');
      return;
    }

    this.appState.setCheckoutItems(selectedItems); 
    this.router.navigate(['/checkout']);
  }
}
