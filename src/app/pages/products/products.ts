import { Component, inject, computed, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AppState } from '../../state/app.state';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnDestroy, AfterViewInit {
  appState = inject(AppState);
  productService = inject(ProductService);
  router = inject(Router);

  heroImages = [
    { src: '/images/imgp1.jpg', title: 'Walk in Comfort', desc: 'Explore our latest sneakers designed for performance and style.' },
    { src: '/images/imgp2.jpg', title: 'Luxury in Every Drop', desc: 'Discover timeless elegance with our premium fragrances.' },
    { src: '/images/imgp3.jpg', title: 'Everyday Essentials', desc: 'Smart outfits that match your daily lifestyle.' }
  ];

  currentSlide = 0;
  private slideTimer?: any;

  ngOnInit() {
    if (this.appState.products().length === 0) {
      this.productService.loadProducts();
    }
   const isTesting = window.location.href.includes('localhost:4200');
  if (isTesting) {
    document.querySelectorAll('.collection-card').forEach(card => {
      (card as HTMLElement).style.pointerEvents = 'none';
    });
  }

  if (!this.appState.weather()) {
    this.appState.loadWeather();
  }

    this.startAutoSlide();
  }

  ngAfterViewInit() {
    const section = document.getElementById('satisfied');
    if (section) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
           
            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(() => this.animateCountersOnly());
            } else {
              this.animateCountersOnly();
            }
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(section);
    }

    const triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    triggers.forEach((el: Element) => {
      const tooltip = new bootstrap.Tooltip(el, { trigger: 'hover' });
      el.addEventListener('click', () => tooltip.hide());
      el.addEventListener('mousedown', () => tooltip.hide());
      el.addEventListener('mouseleave', () => tooltip.hide());
    });
  }

  private animateCountersOnly() {
    const counters = document.querySelectorAll('.counter') as NodeListOf<HTMLElement>;
    const duration = 1200; 
    const easing = (t: number) => 1 - Math.pow(1 - t, 3); 

    counters.forEach((el, i) => {
      const targetAttr = el.getAttribute('data-target');
      if (!targetAttr) return;
      const target = +targetAttr;
      let startTime: number | null = null;

      if (el.classList.contains('finished')) return;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = easing(progress);
        const value = Math.floor(eased * target);
        el.textContent = value.toString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toString();
          el.classList.add('finished');
        }
      };

      setTimeout(() => requestAnimationFrame(animate), i * 400);
    });
  }

  ngOnDestroy() {
    if (this.slideTimer) clearInterval(this.slideTimer);
  }

  startAutoSlide() {
    this.slideTimer = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.heroImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.heroImages.length) % this.heroImages.length;
  }

  goTo(i: number) {
    this.currentSlide = i;
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
      this.startAutoSlide();
    }
  }

  categories = computed(() => [...new Set(this.appState.products().map(p => p.category))]);

  getImageForCategory(cat: string) {
    const p = this.appState.products().find(x => x.category === cat);
    return p ? p.image : 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(cat);
  }

 weatherRecommended = computed(() => {
  const w = this.appState.weather();
  const all = this.appState.products();
  if (!w) return all.slice(0, 8);

  const cond = w.condition?.toLowerCase() || '';

  if (cond.includes('rain') || cond.includes('cold') || cond.includes('storm') || cond.includes('snow')) {
    return all.filter(p =>
      /jacket|coat|rain|winter/i.test(p.title)
    ).slice(0, 8);
  }

  if (
    cond.includes('sun') ||
    cond.includes('clear') ||
    cond.includes('hot') ||
    cond.includes('cloud') ||   
    cond.includes('mild') ||    
    cond.includes('fair')       
  ) {
    return all.filter(p =>
      /t-shirt|short sleeve|v neck|casual|slim fit/i.test(p.title)
    ).slice(0, 8);
  }

  return all.slice(0, 8);
});


  saleProducts() {
    return this.appState.products().sort(() => 0.5 - Math.random()).slice(0, 6);
  }

  randomDiscount() {
    return Math.floor(Math.random() * 41) + 10;
  }

  viewAll(cat: string) {
  this.router.navigate(['/allproducts']);
  }

  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
goToCategory(cat: string) {
  const isTesting = window.location.hostname === 'localhost';
  if (isTesting) {
    console.warn('🧪 Test mode: Navigation to category disabled:', cat);
    return;
  }

  this.router.navigate(['/category', cat]);
}

}
