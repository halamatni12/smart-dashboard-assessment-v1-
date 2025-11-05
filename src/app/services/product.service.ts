import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../state/app.state';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private appState = inject(AppState);

  loadProducts() {
    this.appState.loading.set(true);
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe({
      next: (res) => {
        console.log('✅ Products loaded:', res);
        this.appState.products.set(res);
        this.appState.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Error loading products', err);
        this.appState.loading.set(false);
      }
    });
  }
}
