import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './allproducts.html',
  styleUrls: ['./allproducts.css']
})
export class AllProductsComponent {
  appState = inject(AppState);
  productService = inject(ProductService);
  router = inject(Router);

  selectedCategory = '';
  maxPrice = 2000;
  sortOption = 'none';

  categories: string[] = [];
  filteredProducts: any[] = [];

  isLoading = signal(false);

  ngOnInit() {
    if (this.appState.products().length === 0) {
      this.isLoading.set(true);
      this.productService.loadProducts();

      setTimeout(() => {
        this.loadFilters();
        this.applyFilters();
        this.isLoading.set(false);
      }, 700);
    } else {
      this.loadFilters();
      this.applyFilters();
    }
  }

  loadFilters() {
    const all = this.appState.products();
    this.categories = [...new Set(all.map(p => p.category))];
    this.filteredProducts = all;
  }

  applyFilters() {
    const all = this.appState.products();
    this.filteredProducts = all.filter(p => {
      const matchCat = this.selectedCategory
        ? p.category.toLowerCase() === this.selectedCategory.toLowerCase()
        : true;
      const matchPrice = p.price <= this.maxPrice;
      return matchCat && matchPrice;
    });
    this.applySort();
  }

  applySort() {
    switch (this.sortOption) {
      case 'az':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
