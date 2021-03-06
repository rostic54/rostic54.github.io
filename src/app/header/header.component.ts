import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthService} from '@shared/services/auth.service';
import {Subscription} from 'rxjs';
import {CommonService} from '@shared/services/common.service';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Unx05sp0wgk7iFULk9qzpxHL-krK1PfZaIKIZHJxXR2GyToypQ';
  authCondition;
  subscription: Subscription;
  email;

  /**
   * @summary Control-poUp component constructor
   * @param commonService - CommonService
   * @param dialog - MatDialog service
   * @param authService - Auth Service
   */
  constructor(public dialog: MatDialog,
              public authService: AuthService,
              private commonService: CommonService
  ) {
  }

  /**
   * @summary receiving token from server
   */
  ngOnInit() {
    this.subscription = this.authService.currentTokenSubject.subscribe(
      (token) => {
        this.authCondition = token;
        this.email = this.authService.email;
      },
      (error) => {
        console.log(error);
      }
    );
    this.authCondition = this.authService.getToken();
  }

  /**
   * @summary open popUp form
   */
  openSignUp(): void {
    this.dialog.open(SignUpComponent, {
      width: '450px',
      data: null,
      autoFocus: false
    });
  }

  /**
   * @summary open popUp form
   */
  openSignIn(): void {
    this.dialog.open(SignInComponent, {
      width: '450px',
      data: null
    });
  }

  /**
   * @summary calling logOut method in AuthService
   */
  onSignOut() {
    this.authService.logOut();
  }

  /**
   * @summary cleanUp logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.subscription);
  }

}
