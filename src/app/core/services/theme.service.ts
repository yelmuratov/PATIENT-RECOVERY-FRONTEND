import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'theme';
  private darkMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
    this.darkMode$.next(isDark);
  }

  loadTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    const isDark = saved === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    this.darkMode$.next(isDark);
  }

  isDark(): boolean {
    return this.darkMode$.value;
  }

  get darkModeChanges() {
    return this.darkMode$.asObservable();
  }
}
