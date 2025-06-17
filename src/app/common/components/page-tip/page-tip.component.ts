import { Component,EventEmitter,Input, OnInit,Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule, validateBasis } from 'ngx-flexible-layout';
import { AuthService } from '../../../shared/services/auth.service';



@Component({
  selector: 'app-page-tip',
  imports: [MatIconModule,MatButtonModule,MatMenuModule, FlexLayoutModule],
  templateUrl: './page-tip.component.html',
  styleUrl: './page-tip.component.css'
})
export class PageTipComponent implements OnInit{
  @Input() title!:string;
  @Input() description!:string;
  @Input() actionArray!:any[];
  constructor(){}
  ngOnInit(): void {
  
    console.log("ngoninit",this.title,this.description,this.actionArray);
  }
  @Output() actionEmit=new EventEmitter<any>();
  onActionEmit(event:any)
  {
    console.log("event",event);
    this.actionEmit.emit(event);
  }

  
}
