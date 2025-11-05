import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar';
import { FooterComponent } from '../../../shared/footer/footer';
import { AppState } from '../../../state/app.state';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './category-products.html',
  styleUrls: ['./category-products.css']
})
export class CategoryProductsComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  appState = inject(AppState);
  productService = inject(ProductService);

  categoryName = '';
  products: any[] = [];

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('name') ?? '';
    
    if (this.appState.products().length === 0) {
      this.productService.loadProducts();
      setTimeout(() => this.filterCategory(), 700);
    } else {
      this.filterCategory();
    }
  }

  filterCategory() {
    const all = this.appState.products();
    this.products = all.filter(
      p => p.category.toLowerCase() === this.categoryName.toLowerCase()
    );
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
}
