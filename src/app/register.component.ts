import { Component } from '@angular/core';


@Component({
  selector: 'app-secure',
  template: `{{message}}`
})
export class RegisterComponent {
  message;

  constructor() {
    this.message = 'Register callback for google auth! We need to have user details form fields here. user enters details and we call Register User API from here';
  }
}