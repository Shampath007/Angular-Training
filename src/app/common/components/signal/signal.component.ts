import { ChangeDetectionStrategy, Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { SignalChildComponent } from "../signal-child/signal-child.component";
import { SignalserviceService } from '../../../shared/services/signalservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal',
  imports: [CommonModule,FormsModule],
  templateUrl: './signal.component.html',
  // changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './signal.component.css'
})
export class SignalComponent {
  constructor(private authService:AuthService,public signalservice:SignalserviceService){
    effect(()=>{
      console.log(`Effect Parent works ${signalservice.counter()}`);
    })
    effect(()=>{
      console.log(`Effect add and remove works ${this.todo()}`);
    })
  }
  ngOnInit(){
    this.authService.messages.next("Signal");
  }
  ngDoCheck(){
    console.log("Signal Parent Works");
  }
  text:string='';
  todo: WritableSignal<string[]> = signal([]);
  counttodo:Signal<number>=computed(()=>this.todo().length);
  add() {
    if(this.text!=''){
    this.todo.update(arr => [...arr, this.text]);
    this.text='';
    }
  }
  removeItem(index:number){
    console.log(index);
    this.todo.update(arr => arr.filter((_,i) => i !== index));
  }
  editItem(index:number){
    console.log(index);

  }
  logout(){
    this.authService.logout();
  }
}
