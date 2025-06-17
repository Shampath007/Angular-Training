import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordcheckService } from '../../../shared/services/passwordcheck.service';
import { AuthService } from '../../../shared/services/auth.service';
@Component({
  selector: 'app-changepassword',
  imports: [MatInputModule,MatFormFieldModule,FlexLayoutModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  passwordForm!:FormGroup;
  constructor(private customService:PasswordcheckService,private authService:AuthService){}
  ngOnInit(){
  this.authService.messages.next("Change Password");
  this.authService.messages.subscribe(res => {
    console.log('ChangePasswordComp:', res);
  });
  this.passwordForm=new FormGroup({
    oldPassword:new FormControl(null,Validators.required),
    newPassword:new FormControl(null,Validators.required),
    confirmPassword:new FormControl(null,Validators.required)

  },this.customService.validateAreEqual.bind(this))
}
check(){
  console.log(this.passwordForm.value);
  this.passwordForm.reset();
}

}

