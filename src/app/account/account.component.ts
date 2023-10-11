import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {UserProfile} from "../shared/models/userProfile";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  connectedUser: UserProfile = new UserProfile();
  public links = [
    { name: 'Profile', href: 'profile', icon: 'person' },
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Commandes', href: 'orders', icon: 'list_alt' },
    { name: 'Ajouter Utilisateur', href: 'add-user', icon: 'person_add' },
    { name: 'Logout', href: '/login', icon: 'power_settings_new', action: true},
  ];
  constructor(public router:Router, private authService: AuthService) {
    this.authService.getConnectedUser().subscribe(user => this.connectedUser = user);
  }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(window.innerWidth < 960){
          this.sidenav.close();
        }
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }


}
