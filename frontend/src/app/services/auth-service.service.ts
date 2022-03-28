import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../store/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: Observable<null | User>

  constructor(private store: Store<AppState>, private router: Router) {
    this.user = store.select(state => state.users.user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.user.pipe(
      map(user => {
        if (user) {
          return true;
        }

        void this.router.navigate(['/login']);
        return false;
      })
    )
  }
}
