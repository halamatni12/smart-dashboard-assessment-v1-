import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  router = inject(Router);
  appState = inject(AppState);
  productService = inject(ProductService);

  query = signal('');

  allProducts = computed(() => this.appState.products() || []);

  filtered = computed(() =>
    this.allProducts().filter(p =>
      p.title.toLowerCase().includes(this.query().toLowerCase()) ||
      p.category.toLowerCase().includes(this.query().toLowerCase())
    )
  );

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
