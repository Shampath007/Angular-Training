import { Component} from '@angular/core';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginDirective } from '../../Directives/login.directive';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FlexLayoutModule,MatInputModule,MatButtonModule,LoginDirective,CommonModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private http:HttpClient,private authService:AuthService,private router:Router){}
  userValue:string='';
  passValue:string='';
  defaultUser="shampath";
  defaultPassword="123";
  token="abc123";

  
  ngOnInit(){
    this.authService.messages.next("Directives");
    this.authService.messages.subscribe(res=>{
      console.log("Directive Comp",res);
    });
    // if(sessionStorage.getItem("currentUserToken")){
    //   sessionStorage.removeItem("currentUserToken");
    // }
    
  }
 
  userGet(event:any){
    this.userValue=event.target.value;
    console.log(event.target.value);
  }
  passGet(event:any){
    this.passValue=event.target.value;
    console.log(event.target.value);
  }
  control(){
    if(this.userValue===this.defaultUser&&this.passValue===this.defaultPassword){
      sessionStorage.setItem("currentUserToken",this.token);
      this.router.navigate(['/app/home']);
    }
    else{
      this.router.navigate(['/app/signin']);
    }
  }

 
 
}
