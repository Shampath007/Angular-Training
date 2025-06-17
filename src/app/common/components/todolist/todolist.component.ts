import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../../Pipes/highlight.pipe';
import { AppendPipe } from '../../Pipes/append.pipe';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { DatecomparePipe } from '../../Pipes/datecompare.pipe';
import { FilesizePipe } from '../../Pipes/filesize.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule, FormsModule, HighlightPipe, AppendPipe, FilterPipe, DatecomparePipe, FilesizePipe],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  searchTerm: any;
  filesizemessage!:string;
  ngOnInit() {
    this.authService.messages.next("Pipe");
    this.authService.messages.subscribe(res => {
      console.log("Pipe Comp", res);
    });
  }
  results = [
    { id: 1, summary: "These are the results for the searched text" },
    { id: 2, summary: "Here are some more results you searched for" },
    { id: 3, summary: "Searching for answers, are we?" },
    { id: 4, summary: "What more could you ask for?" }
  ];
  users = [
    { name: 'shampath', gender: 'm' },
    { name: 'kumar', gender: 'm' },
    { name: 'Janani', gender: 'F' }

  ];
  updateSearch(e: any) {
    this.searchTerm = e.target.value;
  }
  onadd() {
    // this.users.push({name:this.searchTerm,gender:'m'}); //impure na address change akalananum print akum pure na address change anathan print akum
    this.users = [...this.users, { name: this.searchTerm, gender: 'm' }] //pure na ipdii tham pannanum memory address marirum...athulana than work akum
  }
  opening = false;
  open() {
    this.opening = !this.opening;
  }
  inputDate = 'Mar 15 2025 1:59:14 PM';
  constructor(private snackbar:MatSnackBar,private authService:AuthService){}
  filesize: number = 0;
  filename!: string;
  imageUrl!: any;
  imagewidth!:any;
  imageheight!:any;
  onFileSelected(e: any) {
    const files = e.target.files[0];
    console.log(files);
    if (files) {
      this.filesize = files.size;
      const fileExtension=files.name.split('.').pop()?.toLowerCase();
      if(fileExtension!=='jpg' || fileExtension!=='png' || fileExtension!=='jpeg'){
        this.openmessage('Only PNG and JPG images are allowed');
        this.opening=false;
      }
      const filesizePipe = new FilesizePipe();
      this.filesizemessage=filesizePipe.transform(this.filesize);
      console.log(this.filesizemessage);
      if (this.filesizemessage ==='File Size Exceed 50kb'){
        this.openmessage(this.filesizemessage);
        this.opening=false;
      }
      else{
      this.filename = files.name;
      console.log(this.filesize);
      console.log(this.filename);
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        console.log(img.src);
        this.imageUrl = img.src;
        img.onload = () => {
          this.imagewidth=img.width;
          this.imageheight=img.height;
        }

      }
    }
    }
  }
  openmessage(message:string){
    this.snackbar.open(message,'close',{
      duration:3000,
      horizontalPosition: 'center', 
      verticalPosition: 'top'
    
    })
  }

 

 


}
