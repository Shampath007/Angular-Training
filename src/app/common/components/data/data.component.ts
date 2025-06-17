import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User{
  id:number,
  username:string,
  email:string
}
interface Login{
  email:string,
  password:string
}
interface create{
  username:string,
  email:string,
  password:string,
  roleId:number,
  managerId:number
}
interface feedback{
  receiverId:number,
  feedback:string
}
interface update{
  email:string
}
interface datadelete{
  id:number
}
interface graph{
  query: string;
  variables: {
    email: string;
    password: string;
  };
}


@Component({
  selector: 'app-data',
  imports: [CommonModule,FormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  constructor(private authService:AuthService,private Http:HttpClient){}
  // fetch:User[]=[];
  check:boolean=true;
  control$:Observable<User[]>=new Observable();
  ngOnInit(){
    this.authService.messages.next("Data");
    // const user= this.Http.get<{data:User[]}>("http://34.29.23.235:8080/user/userDetails");
    // user.subscribe({
    //   next:(res)=>{
    //     this.fetch=res.data;
    //     console.log(this.fetch);
    //   }
    // });
    this.control$ = this.Http.get<{ data: User[] }>("http://34.60.224.29:8080/user/userDetails").pipe(
      map(response => response.data)
    );  
  }
  adduser(){
    const newuser:create={
     username:"shampath",
     email:"shampath7rk@gmail.com",
     password:"Shampath@03",
     roleId:2,
     managerId:2
    }
    this.Http.post<create>("http://34.60.224.29:8080/user/createUser",newuser).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:err=>{
        console.log(err.error.error);
      }   
    })
  }
  token!:string;
  Login(){
    const login:Login={
      email:"roche@gmail.com",
      password:"roche33@33"
    }
    this.Http.post<any>("http://34.60.224.29:8080/user/login",login).subscribe({
      next:(res)=>{
        this.token=res.data.cryptoToken;
        this.authService.setToken(this.token);
        console.log(this.token);
      },
      error: err => {
      console.log(err.error.error);
      } 
    })
  }
  feedback(){
    const feed:feedback={
      receiverId:22,
      feedback:"hello everyone Tommorrrow is a holiday"
    }
    const headers=new HttpHeaders({'Authorization':`${this.authService.getToken()}`})
    this.Http.post<any>("http://34.60.224.29:8080/user/sendFeedback",feed,{headers}).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }
  email!:string;
  update(){
    const up:update={
      email:this.email
    }
    const headers = new HttpHeaders({ 'Authorization': `${this.authService.getToken()}` })
    this.Http.patch<any>("http://34.60.224.29:8080/user/updateUser", up, {headers}).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
    
  }
  id!:number;
  delete(){
    const de:datadelete={
      id:this.id
    }
    const headers = new HttpHeaders({ 'Authorization': `${this.authService.getToken()}` })
    this.Http.delete<any>("http://34.60.224.29:8080/user/deleteUser", {headers,body:de}).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
  text!:string;
  onSubmit(){
    this.authService.sendData(this.text);
    console.log("submitted successfully");
  }
  graph(){
    const de: graph = {
      query: `mutation UserLogin($email: Email, $password: String) { 
      userLogin(email: $email, password: $password) { 
        username 
        cryptoToken 
      } 
    }`,
      variables: {
        email: "roche@gmail.com",
        password: "roche33"
      }
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.Http.post<any>("http://34.60.224.29:8080/graphql", de, { headers }).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
}

}
