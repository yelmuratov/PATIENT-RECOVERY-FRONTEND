import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const isLoggedIn = auth.isAuthenticated();

  if (isLoggedIn) {
    // ✅ Redirect to 404 if already logged in
    return inject(Router).parseUrl('/404');
  }

  return true;
};
