import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  LOGIN_ROUTE,
  USERS_ROUTE,
  CHANGE_PASSWORD_ROUTE,
} from 'src/app/core/constants/routes';
import { AuthFacade } from '../auth/facade/auth.facade';

interface HomeComponentState {
  isAuthenticated: boolean;
}

const initHomeComponentState: Partial<HomeComponentState> = {
  isAuthenticated: true,
};

import {
  RegistrationType,
  UserFormComponent,
} from '../users/components/user-form/user-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RxState],
})
export class HomeComponent implements OnInit {
  accountManagement = {
    link: USERS_ROUTE,
    label: `users`,
    icon: `account_circle`,
  };


  loginRoute = {
    link: LOGIN_ROUTE,
    label: `Login`,
    icon: '',
  };

  logoutRoute = {
    link: '',
    label: `Logout`,
    icon: '',
  };

  changePasswordRoute = {
    link: CHANGE_PASSWORD_ROUTE,
    label: 'Change Password',
    icon: '',
  };

  isAuthenticated$: Observable<boolean> = this.state.select('isAuthenticated');

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private state: RxState<HomeComponentState>,
    private matDialog: MatDialog
  ) {
    this.state.set(initHomeComponentState);
    this.state.connect('isAuthenticated', authFacade.isAuthenticated$);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      // !isAuthenticated && this.router.navigate(['/']);
    });
  }

  logout() {
    this.authFacade.dispatchLogout();
  }

  manageAccounts() {}

  addUser() {
    this.matDialog.open(UserFormComponent, {
      data: { update: false, registrationType: RegistrationType.USER },
      disableClose: true,
    });
  }
}