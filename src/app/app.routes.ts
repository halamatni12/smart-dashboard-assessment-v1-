import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products';
import { DetailsComponent } from './pages/details/details';
import { AllProductsComponent } from './pages/products/allproducts';
import { CategoriesComponent } from './pages/categories/categories';
import { CategoryProductsComponent } from './pages/categories/category-products/category-products';
import { AboutComponent } from './pages/about/about';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { ProfileComponent } from './pages/profile/profile';
import { SearchComponent } from './pages/search/search';

import { AuthGuard } from './core/auth-guard';

export const routes: Routes = [
  // Auth Pages (No guard here)
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Protected Pages
  { 
    path: 'welcome',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/welcome/welcome').then(m => m.WelcomeComponent)
  },

  { path: 'weather/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },

  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/category/:name', component: ProductsComponent, canActivate: [AuthGuard] },

  // 🚀 Details Page MUST be this one ONLY
  { path: 'products/:id', component: DetailsComponent, canActivate: [AuthGuard] },

  { path: 'allproducts', component: AllProductsComponent, canActivate: [AuthGuard] },

  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'category/:name', component: CategoryProductsComponent, canActivate: [AuthGuard] },

  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
