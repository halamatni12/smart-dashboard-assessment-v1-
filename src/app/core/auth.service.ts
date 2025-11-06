import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  User
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly userSignal = signal<User | null>(null);

  readonly displayName = computed(() =>
    this.userSignal()?.displayName ||
    this.userSignal()?.email?.split('@')[0] ||
    'Guest'
  );

  constructor() {
    onAuthStateChanged(this.auth, (user) => this.userSignal.set(user));
  }

  async login(email: string, password: string) {
    await setPersistence(this.auth, browserLocalPersistence); 
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup(email: string, password: string, name?: string) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
      this.userSignal.set({ ...cred.user, displayName: name } as User);
    }
    return cred;
  }

  isLoggedIn() {
    return this.userSignal() !== null;
  }

  async logout() {
    await signOut(this.auth);
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }
}
