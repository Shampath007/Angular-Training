import { Component, signal, WritableSignal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule,RouterLink } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Breakpoints,BreakpointObserver} from '@angular/cdk/layout';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from 'ngx-flexible-layout';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule,RouterModule,RouterLink,MatIconModule,MatSidenavModule,FlexLayoutModule,MatListModule,MatToolbarModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router:Router,private snackbar:MatSnackBar,private breakpoint:BreakpointObserver,private authService:AuthService){}
  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }
  sidenavmode:'side'|'over'='side';
  opened=true;
  ActiveItem!:string;

  activeRoute: WritableSignal<string | null> = signal('');
  ngOnInit(){
    this.authService.messages.subscribe((res:string | null ) => {
      this.activeRoute.set(res);
    });
    this.breakpoint.observe([Breakpoints.Handset,Breakpoints.Tablet])
    .subscribe(result=>{
      if(result.matches){
        this.sidenavmode='over';
        this.opened=true;
      }
      else{
        this.sidenavmode='side';
        this.opened=true;
      }
    })
  }
  menuItems = [
    { label: 'Table', routerLink: '/app/table' },
    { label: 'Add Employee', routerLink: '/app/employee-reg' },
    { label: 'Snack', routerLink: '/app/snackbar' },
    { label: 'Pipe', routerLink: '/app/todolist' },
    { label: 'Change Password', routerLink: '/app/changepassword' },
    // { label: 'Directives', routerLink: '/app/signin' },
    { label:'Signal',routerLink:'/app/signal'},
    { label: 'Subject', routerLink: '/app/subject' },
    { label:'Data',routerLink:"/app/data"},
    
  ];
  logout(){
    this.authService.logout();
  }
  





}
