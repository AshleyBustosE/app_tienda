import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean = false;
  currentRoute: string = '';
  route: string = '';

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private location: Location,
    private router: Router,
  ){}

  ngOnInit(): void{
    this.auth.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    })
  }

  login(): void {
    this.route = this.location.path();
    this.auth.loginWithRedirect({
      appState: { target: this.route}
    });
  }
  
  logout(): void {
    this.auth.logout();
  }

}
