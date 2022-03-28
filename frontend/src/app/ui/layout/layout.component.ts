import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { logoutUser } from '../../store/users.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: Observable<null | User>;

  constructor(private breakpointObserver: BreakpointObserver,private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}
