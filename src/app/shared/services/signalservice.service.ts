import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalserviceService {
  constructor() { }
  counter:WritableSignal<number>=signal(0);
  doubleCount:Signal<string>=computed(()=>this.counter()%2==0?"even":"odd");
  message:string='';
  incrementParent(){
    this.counter.update(v=>v+1);
    if(this.counter()>10){
      this.message="Limit Reached!";
    }
  }
  decrementParent(){
    this.counter.update(v=>v-1);
  }
  reset(){
    this.counter.set(0);
  }
  childcounter:WritableSignal<number>=signal(0);
  doublechild:Signal<number>=computed(()=>this.childcounter()*2);
  incrementchild() {
    this.childcounter.update(value => value + 1);
  }
}
