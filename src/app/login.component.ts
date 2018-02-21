import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-secure',
  template: `
    <!-- Container to inject the Sign-In Widget -->
    <div id="okta-signin-container"></div>
  `
})
export class LoginComponent {
  signIn;

  widget = new OktaSignIn({
    baseUrl: 'https://dev-782937.oktapreview.com',
    clientId: '0oadq5bn0qfRlZ9n30h7',
    redirectUri: 'http://localhost:4200/implicit/callback',
    oAuthTimeout: 30000,
    idps: [
        {type: 'GOOGLE', id: '0oadq79q2woFJXj7p0h7'}
      ]
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  ngOnInit() {
    this.widget.renderEl(
      { el: '#okta-signin-container'}, res => {
        if (res.status === 'SUCCESS') {
          console.log(res);
          this.signIn.loginRedirect({ sessionToken: res.idToken });
          // Hide the widget
          console.log(res.idToken);
          this.widget.hide();
        }
        else {
            console.log('error -'+ res);
        }
      }
    );
  }
}