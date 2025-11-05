import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class WishlistComponent {
  appState = inject(AppState);
  wishlist = this.appState.wishlist;

  private moveModal: any;
  private deleteModal: any;
  itemToMove: any = null;
  itemToDelete: any = null;

  ngOnInit() {
    this.moveModal = new bootstrap.Modal(document.getElementById('moveModal')!);
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal')!);
  }

  confirmDelete(item: any) {
    this.itemToDelete = item;
    this.deleteModal.show();
  }

  deleteConfirmed() {
    this.appState.removeFromWishlist(this.itemToDelete);
    this.deleteModal.hide();
  }

  confirmMove(item: any) {
    this.itemToMove = item;
    this.moveModal.show();
  }

  moveConfirmed() {
    this.appState.addToCart(this.itemToMove);
    this.appState.removeFromWishlist(this.itemToMove);
    this.moveModal.hide();
  }
}
