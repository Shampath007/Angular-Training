import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-employee-reg',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, FlexLayoutModule, 
  MatSelectModule,MatDatepickerModule,MatDividerModule,MatIconModule,CommonModule,FormsModule],
  templateUrl: './employee-reg.component.html',
  styleUrl: './employee-reg.component.css'
})
export class EmployeeRegComponent implements OnInit{
  employeeRegistrationForm!: FormGroup;
  action!:string;
  message:any;
  constructor(private router:ActivatedRoute,private authService:AuthService){}
  todaydate=new Date();
  Designation=[
    {id:1,name:"software Developer"},
    {id:2,name:"UX Designer"},
    {id:3,name:"Angular Developer"}
  ];
  Status=[
    {id:1,name:'Valid'},
    {id:2,name:'Invalid'}
  ]
  Role=[
    {id:1,name:"Admin"},
    {id:2,name:"Trainee"},
    {id:3,name:"Staff"}
  ];
  ngOnInit(): void {
    this.message=this.authService.message;
    this.authService.messages.next("Add Employee");
    this.authService.messages.subscribe(res => {
      console.log('EmployeeComp:', res);
    });
    this.router.paramMap.subscribe(params =>{
      console.log('Response', params);  
      this.action =params.get('data')!;
      console.log('action',this.action);
    })
    this.employeeRegistrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      alternativeEmail: new FormControl(null, Validators.required),
      DateofBirth: new FormControl(null, Validators.required),
      DateofJoining: new FormControl(null, Validators.required),
      designationId: new FormControl(null, Validators.required),
      roleId: new FormControl(null, Validators.required),
      status:new FormControl(null,Validators.required),
      contacts: new FormArray([])
    })
    this.createArray();
    if(this.action==='edit'){
      this.editform();
    }
    if(this.action==='view'){
      this.viewform();
    }
    if(this.action==='create'){
      this.createform();
    }
  }
  createArray(){
    (this.employeeRegistrationForm.get('contacts') as FormArray).push(new FormGroup({
      address:new FormControl('',Validators.required),
      city:new FormControl('', Validators.required),
      state:new FormControl('', Validators.required),
      pincode:new FormControl('', Validators.required)
    }))
  }
  removeItem(index:number){
    return(this.employeeRegistrationForm.get('contacts')as FormArray).removeAt(index);
  }
  getContacts(){
    console.log("Get contacts");
    return (this.employeeRegistrationForm.get('contacts') as FormArray).controls;
  }
  getControls(form:any ,i:number){
    return form.get('contacts').controls[i].controls;
  }
  submit(){
    if(this.employeeRegistrationForm.valid){
      console.log(this.employeeRegistrationForm.value);
      console.log(this.employeeRegistrationForm);
     }
  }
  reset(){
    this.employeeRegistrationForm.reset();
  }
  editform() {
    this.employeeRegistrationForm.enable();
    this.employeeRegistrationForm.addControl(
      'newControl',
      new FormControl(null)
    );
    this.employeeRegistrationForm.get('newControl')?.valueChanges.subscribe(res => {
      if (!res) {
        this.employeeRegistrationForm.get('newControl')?.setErrors({ misMatch: true });
      }
      this.employeeRegistrationForm.updateValueAndValidity();
    });
    // this.employeeRegistrationForm.get('newControl')?.setValidators(Validators.required);
  }
  viewform(){
    this.employeeRegistrationForm.get('newControl')?.clearValidators();
    this.employeeRegistrationForm.get('newControl')?.updateValueAndValidity();
    this.employeeRegistrationForm.disable();
  }
  createform(){
    this.employeeRegistrationForm.enable();
    this.employeeRegistrationForm.removeControl('newControl');
    this.employeeRegistrationForm.updateValueAndValidity();
  } 
  todayDate = new Date().toLocaleDateString('en-US');
  dateofJoining!:any;
  getIdValue!:any;
  onGet(event:any) {
    this.employeeRegistrationForm.get('status')?.setErrors(null);
    console.log('selected Date ',event.value); 
    this.dateofJoining = new Date(event.value).toLocaleDateString('en-US');
    console.log(this.dateofJoining);
    if(this.getIdValue==2){
      console.log("Today Date ", this.todayDate);
      if (this.todayDate === this.dateofJoining) {
        console.log('correct');
        this.employeeRegistrationForm.updateValueAndValidity();
        console.log(this.employeeRegistrationForm.get('status'))
      }
      else {
        console.log('error');
        this.employeeRegistrationForm.get('status')?.setErrors({ misMatch: true });
      }
    }
  }
  onSelect(event:any){
    this.employeeRegistrationForm.get('status')?.setErrors(null);
    console.log(event.value);
    this.getIdValue=event.value;
    if(event.value==2){
      console.log("Today Date ",this.todayDate);
      if (this.todayDate=== this.dateofJoining){
        console.log('correct');
        this.employeeRegistrationForm.updateValueAndValidity();
        
      }
      else{
        console.log('error');
        this.employeeRegistrationForm.get('status')?.setErrors({misMatch:true});
      }
    }
  }
  canDeactivate():boolean{
    return this.employeeRegistrationForm?!this.employeeRegistrationForm.dirty:true;
  }
}

