import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  userName = signal<string>('Guest');
}
