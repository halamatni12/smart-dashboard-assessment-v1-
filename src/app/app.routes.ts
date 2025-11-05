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



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'welcome', loadComponent: () => import('./pages/welcome/welcome').then(m => m.WelcomeComponent) },

{ path: 'weather/dashboard', component: DashboardComponent },
     { path: 'products', component: ProductsComponent },
     { path: 'products/category/:name', component: ProductsComponent }
,{ path: 'products/:id', component: DetailsComponent },
  { path: 'allproducts', component: AllProductsComponent },
{ path: 'products/:id', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:name', component: CategoryProductsComponent },
  { path: 'about', component: AboutComponent },
{ path: 'wishlist', component: WishlistComponent },

{ path: 'cart', component: CartComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'profile', component: ProfileComponent },
{
  path: 'search',
  loadComponent: () =>
    import('./pages/search/search').then(m => m.SearchComponent),
},

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
