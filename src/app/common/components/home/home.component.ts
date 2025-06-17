
import { Component } from '@angular/core';
import { LowercasePipe } from '../../Pipes/lowercase.pipe';
import { BehaviorSubject, Observable, Observer, Subscription, filter,map, mergeMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';



@Component({
  selector: 'app-home',
  imports: [LowercasePipe,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name="SHAMPATH";
  // constructor(){}
  // data= Observable<number>;
  // subscription=new Subscription;
  // ngOnInit(){
  //   data=new Observable((subscribe:Observer<number>)=>{
  //     subscribe.next(2);
  //     // subscribe.error("data not loaded");
  //     subscribe.next(3);
  //     subscribe.next(4);
  //     subscribe.next(5);
  //     subscribe.complete();
  //   })
  

  //   old method deprecated
  //   data.subscribe(res=>{
  //     console.log(res);
  //   },(err)=>{
  //     console.log('err',err);
  //   },()=>{
  //     console.log("completed data");
  //   })
  //   using map and filter to filter the data...
  //   data.pipe(map(x=>x*2)).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //     },
  //     error:(err)=>{
  //       console.log('err',err);
  //     },
  //     complete:()=>{
  //       console.log("Data Transferred Successfully");
  //     }
  //   });
  //   this.data.subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //     },
  //     error:(err)=>{
  //       console.log('err',err);
  //     },
  //     complete:()=>{
  //       console.log("Data Transferred Successfully");
  //     }
  //   });

  // }
  
  data!:Observable<number>;
  subscription=new Subscription;
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.messages.next('dfghd');
    this.authService.messages.subscribe(res=>{
      console.log(' home component message for behaviour subject',res);
    });
    this.data=new Observable((subscribe:Observer<number>)=>{
      setInterval(()=>{
        subscribe.next(1)
      },1000)
    })
    // this.subscription.add(this.data.subscribe({
    //   next:(res:number)=>{
    //     console.log(res);
    //   },
    //   error:(err:any)=>{
    //     console.error('error',err);
    //   },
    //   complete:()=>{
    //     console.log("complete");
    //   }
    // }));
    ///old method is not using to this one...making as a new one as below
    // this.subscription.add(this.getObservable1().subscribe(res=>{
    //   console.log('res1:number',res);
    //   this.subscription.add(this.getObservable2().subscribe(res => {
    //     console.log('res2:string', res);
    //   }));
    // }));
    // this.subscription.add(this.getObservable1().pipe(mergeMap(res=>{
    //   console.log('res1',res);
    //   return this.getObservable2(res);
    // })).subscribe(res=>{
    //   console.log('res2',res);
    // }))
    this.subscription.add(this.getObservable1().pipe(mergeMap((res)=>{
      console.log('res1',res);
      return this.getObservable2(res);
    }),
    mergeMap(res=>{
      console.log('res2',res);
      return this.getObservable3(res);
    }),
    mergeMap(res=>{
      console.log('res3',res);
      return this.getObservable4(res);
    })).subscribe(res=>{
      console.log('res4',res);
    }));
  }
  getObservable1():Observable<number>{
    return new Observable(subscribe=>{
      setTimeout(()=>{
        subscribe.next(1);
      },1000)
    });
  }
  getObservable2(id:number):Observable<string>{
    return new Observable(subscribe=>{
      subscribe.next("abcd");
    })
  }
  getObservable3(id:string): Observable<string> {
    return new Observable(subscribe => {
      subscribe.next("xyz");
    })
  }
  getObservable4(id:string):Observable<string>{
    return new Observable(subscribe=>{
      subscribe.next("shampath");
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onSubmit(){
    this.authService.messages.next("hello");
  }
 

  
}
