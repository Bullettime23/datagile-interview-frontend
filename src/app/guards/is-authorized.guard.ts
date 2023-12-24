import { CanActivateFn } from '@angular/router';

export const isAuthorizedGuard: CanActivateFn = (route, state) => {
  return true;
};
