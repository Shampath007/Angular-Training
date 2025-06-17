import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttproutingService } from './httprouting.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  messages=new BehaviorSubject<string|null>(null);
  token = new BehaviorSubject<string | null>(localStorage.getItem("authToken"));
  constructor(private httpservice:HttproutingService,private router:Router) {
  }
  setToken(newToken: string) {
    this.token.next(newToken);
    localStorage.setItem("authToken", newToken);
  }
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
  normalMessage=new BehaviorSubject<string|null>(null);
  sharedData = this.normalMessage.asObservable(); 
  sendData(data:string){
    this.normalMessage.next(data);
    console.log("Service Updated");
  }
  message:any;
  getmessages(){
    this.httpservice.getJsonData('messages.json').subscribe(res=>{
      this.message=res;
      console.log(res);
    })
  }
  isAuthenicated():boolean{
    const token=sessionStorage.getItem("currentUserToken");
    if(token){
      return true;
    }
    else{ 
      return false;
    }
  }
  logout(){
    sessionStorage.removeItem("currentUserToken");
    this.router.navigate(['']);
    return true;
  }
}
