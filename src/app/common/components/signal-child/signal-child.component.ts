import { ChangeDetectionStrategy,ChangeDetectorRef,Component, effect, Input, signal, WritableSignal } from '@angular/core';
import { SignalserviceService } from '../../../shared/services/signalservice.service';

@Component({
  selector: 'app-signal-child',
  imports: [],
  templateUrl: './signal-child.component.html',
  // changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './signal-child.component.css'
})
export class SignalChildComponent {
  constructor(private cd:ChangeDetectorRef,public signalservice:SignalserviceService){
    effect(()=>{
          console.log(`Effect Child works ${signalservice.childcounter()}`);
    })
   this.cd.detach();
  }
  ngDoCheck(){
    console.log("Signal Child Works");
  }
  
  
    
}
