import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <span class="text-lg animate-pulse text-gray-500 dark:text-gray-300">
        🔄 Loading Curevia...
      </span>
    </div>
  `
})
export default class SplashScreenComponent {}
