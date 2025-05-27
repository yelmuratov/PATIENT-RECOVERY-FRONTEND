import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SplashScreenComponent from './shared/component/splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  splashScreen = SplashScreenComponent;
}
