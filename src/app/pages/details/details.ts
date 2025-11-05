import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);
  appState = inject(AppState);

  product: any = null;
  loading = true;

  isClothing = false;
  sizes = ['S', 'M', 'L', 'XL'];
  selectedSize: string | null = null;

  selectedImage: string | null = null;
  thumbnails: string[] = [];
  relatedProducts: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) this.fetchProduct(id);
    });
  }

  showToast(message: string) {
    const el = document.getElementById('appToast')!;
    const msg = document.getElementById('toastMessage')!;
    msg.innerText = message;
    const toast = new bootstrap.Toast(el);
    toast.show();
  }

  fetchProduct(id: number) {
    this.loading = true;
    this.http.get<any>(`https://fakestoreapi.com/products/${id}`).subscribe({
      next: (res) => {
        this.product = { ...res };
        this.isClothing = res.category.toLowerCase().includes('clothing');
        this.selectedImage = res.image;
        this.generateThumbnails();
        this.loadRelated();
        this.loading = false;
      }
    });
  }

  generateThumbnails() {
    this.thumbnails = [
      this.product.image,
      this.product.image + '?1',
      this.product.image + '?2',
      this.product.image + '?3'
    ];
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.showToast(`✅ Size ${size} selected`);
  }

  loadRelated() {
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe({
      next: (all) => {
        this.relatedProducts = all.filter(
          p => p.category === this.product.category && p.id !== this.product.id
        ).slice(0, 4);
      }
    });
  }

  addToCart() {
    if (this.isClothing && !this.selectedSize) {
      this.showToast("👕 Please select size first!");
      return;
    }
    this.appState.addToCart(this.product);
    this.showToast("🛍 Added to Cart");
  }

  addToWishlist() {
    this.appState.addToWishlist(this.product);
    this.showToast("💖 Added to Wishlist");
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
