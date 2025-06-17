import { Injectable } from '@angular/core';
import { HttproutingService } from './httprouting.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpService:HttproutingService) { }
  users={
    username: "shampathkumar",
    email: "shampat@gmail.com",
    password: "Shampath@03",
    roleId: 2,
    managerId: 2
  }
  update={
    title:'hello everyone'
  }
  getposts(){
    return this.httpService.getMethod('userDetails');
  }
  addpost(){
    const header = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.httpService.postMethod('createUser',this.users,{header});
  }
  updatepost(){
    return this.httpService.patchMethod('posts/1',this.update)
  }
  deletepost() {
    return this.httpService.deleteMethod('posts/1') 
  }
  
 
}
