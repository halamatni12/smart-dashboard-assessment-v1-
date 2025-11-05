import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppState {
  private currentUserEmail: string | null = null;

  private userKey(key: string) {
    return this.currentUserEmail ? `${key}_${this.currentUserEmail}` : key;
  }

  private load(key: string) {
    try {
      return JSON.parse(localStorage.getItem(this.userKey(key)) || '[]');
    } catch {
      return [];
    }
  }

  private save(key: string, value: any) {
    localStorage.setItem(this.userKey(key), JSON.stringify(value));
  }

  user = signal<any | null>(null);
  weather = signal<any | null>(null);
  products = signal<any[]>([]);
  cart = signal<any[]>([]);
  wishlist = signal<any[]>([]);
  orders = signal<any[]>([]);
  loading = signal<boolean>(false);
  checkoutItems = signal<any[]>([]); 

  setCheckoutItems(items: any[]) {
    this.checkoutItems.set(items);
  }

  removeCheckoutItems(itemsToRemove: any[]) {
    const remaining = this.cart().filter(
      c => !itemsToRemove.some(r => r.id === c.id)
    );
    this.cart.set(remaining);
    this.saveCart();
  }

  setUser(email: string | null) {
    this.currentUserEmail = email;
    this.user.set(email ? { email } : null);
    this.loadUserData();
  }

  addToCart(product: any) {
    const exists = this.cart().find(p => p.id === product.id);
    const updated = exists
      ? this.cart().map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      : [...this.cart(), { ...product, qty: 1, selected: true }];
    this.cart.set(updated);
    this.saveCart();
  }

  removeFromCart(product: any) {
    const updated = this.cart().filter(p => p.id !== product.id);
    this.cart.set(updated);
    this.saveCart();
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem(this.userKey('cart'));
  }

  saveCart() {
    this.save('cart', this.cart());
  }

  addToWishlist(product: any) {
    if (!this.wishlist().some(p => p.id === product.id)) {
      const updated = [...this.wishlist(), product];
      this.wishlist.set(updated);
      this.saveWishlist();
    }
  }

  removeFromWishlist(product: any) {
    const updated = this.wishlist().filter(p => p.id !== product.id);
    this.wishlist.set(updated);
    this.saveWishlist();
  }

  clearWishlist() {
    this.wishlist.set([]);
    localStorage.removeItem(this.userKey('wishlist'));
  }

  saveWishlist() {
    this.save('wishlist', this.wishlist());
  }

  addOrder(order: any) {
    const updated = [...this.orders(), order];
    this.orders.set(updated);
    this.saveOrders();
  }

  clearOrders() {
    this.orders.set([]);
    localStorage.removeItem(this.userKey('orders'));
  }

  saveOrders() {
    this.save('orders', this.orders());
  }

  private loadUserData() {
    this.cart.set(this.load('cart'));
    this.wishlist.set(this.load('wishlist'));
    this.orders.set(this.load('orders'));
  }
loadWeather() {
  const latitude = 33.8938;
  const longitude = 35.5018;

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      if (data && data.current_weather) {
        const weatherCode = data.current_weather.weathercode;
        const condition = this.mapWeatherCode(weatherCode);

        this.weather.set({
          condition: condition,
          temp: data.current_weather.temperature
        });

        console.log('🌤 Weather loaded:', condition, data.current_weather.temperature);
      }
    })
    .catch(err => console.error('Weather fetch failed:', err));
}

private mapWeatherCode(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    61: 'Rain',
    63: 'Heavy Rain',
    71: 'Snow',
    80: 'Showers',
    95: 'Thunderstorm'
  };
  return map[code] || 'Unknown';
}

}
