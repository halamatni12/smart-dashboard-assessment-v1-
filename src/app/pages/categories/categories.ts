import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class CategoriesComponent {
  appState = inject(AppState);
  productService = inject(ProductService);
  router = inject(Router);

  categories: string[] = [];

  ngOnInit() {
    if (this.appState.products().length === 0) {
      this.productService.loadProducts();
      setTimeout(() => this.loadCategories(), 700);
    } else {
      this.loadCategories();
    }
  }

  loadCategories() {
    const all = this.appState.products();
    this.categories = [...new Set(all.map(p => p.category))];
  }

  viewCategory(cat: string) {
    this.router.navigate(['/products'], { queryParams: { category: cat } });
  }
}
