import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { BehaviorSubject, combineLatest, concat, forkJoin, fromEvent, merge, Observable, race, ReplaySubject, Subject, Subscription, zip,} from 'rxjs';
import { of,from ,interval,timer} from 'rxjs';
import { map,filter,first, switchMap,delay,concatMap,take, mergeMap, exhaustMap, debounceTime, min,} from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  subject = new ReplaySubject<number>(3);
  try:any[]=[];
  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authService.messages.next("Subject");
    this.subject.subscribe({
      next: (v) => console.log(`Observer A ${v}`)
    });
    this.subject.next(1); 
    this.subject.next(2);
    this.subject.subscribe({
      next: (v) => console.log(`Observer B ${v}`)
    });
    this.subject.next(3);
    this.subject.next(4);
    this.subject.next(5)
    this.subject.subscribe({
      next: (v) => console.log(`Observer C ${v}`)
    });
    this.subject.next(6);
    of(1, 2, 3)
      .pipe(switchMap(x => of(x * x)))
      .subscribe((v) => console.log(`value ${v}`));
    from([1,2,3])
    .subscribe((v)=>console.log(`value ${v}`));
    of(1,2,3)
      .pipe(filter(x=>x>2),
      map(x=>x*10))
      .subscribe((v)=>console.log(`value ${v}`));
    of(1,2,3)
    .pipe(first())
    .subscribe((v)=>console.log(`value ${v}`));
    of({name:'shampath',age:40})
    .subscribe((v)=>console.log(v.name , v.age));
    of("shampath","kumar")
    .pipe(switchMap(x=>of({id:x}).pipe(delay(1000)))
    ).subscribe(console.log);
    of("A", "B","C").pipe(
      concatMap(value => of(value).pipe(take(2)))).subscribe(v => console.log(`ConcatMap is ${v}`));
    of("A", "B")
      .pipe(mergeMap(x => of(x).pipe(take(2)))).subscribe((v) => console.log(`mergeMap ${v}`));
    of("A", "B")
      .pipe(exhaustMap(x => of(x).pipe(take(2)))).subscribe((v) => console.log(`ExhaustMap ${v}`));
    const searchInput = document.getElementById("searchBox") as HTMLInputElement;
    fromEvent(searchInput,'input').pipe(
      debounceTime(500),
      map(event => (event.target as HTMLInputElement).value) 
    ).subscribe(value => console.log(`value is ${value}`));

    interval(2000).pipe(
      take(10),
      map(()=>Math.floor(Math.random()*10))
    ).subscribe(res=>{
      this.try.push(res);
      console.log(this.try);
    });

    this.authService.sharedData.subscribe(data=>{
      console.log("subject data",data);
    })
  }
  fetch!: Observable<number>;
  su=new Subscription;
  c!:number;
  numbers:any[]=[];
  emit(){
    if (this.c=== 1) {
      console.log("Emission stopped, already generated 5 numbers.");
      return; 
    }
    this.fetch= new Observable(subscribe=>{
      let count=0;
      const intervalId=setInterval(()=>{
        const random=Math.floor(Math.random()*10);
        subscribe.next(random);
        count++;
        if(count>=10){
          clearInterval(intervalId);
          subscribe.complete();
        }
      },1000)
    });
    const sub=this.fetch.pipe(filter(num=>num%2==0)).subscribe(num=>{
      this.numbers.push(num);
      if(this.numbers.length>9){
        this.c=1;
        console.log("Emission Stopped")
      }
      console.log(this.numbers);
    });
    this.su.add(sub);
  }
 
}

const obs1 = of(1, 2, 3); 
const obs2 = timer(2000); 
forkJoin([obs1, obs2]).subscribe(res => {
  console.log('ForkJoin',res);
});
combineLatest([obs1, obs2]).subscribe(res => {
  console.log('CombineLatest', res);
});
const merge1=interval(1000).pipe(take(2));
const merge2=interval(500).pipe(take(2));
merge(merge1,merge2).subscribe(res=>{
  console.log("Merge",res);
});
concat(merge1, merge2).subscribe(res => {
  console.log("Concat", res);
});
race(merge1,merge2).subscribe(res=>{
  console.log('Race',res);
});
zip(merge1,merge2).subscribe(res=>{
  console.log('Zip',res);
});




