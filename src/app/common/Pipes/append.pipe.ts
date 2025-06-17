import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'append',
  standalone:true,
  pure:true
})
export class AppendPipe implements PipeTransform {

  transform(value: string,args:string):string {
    console.log("appendpipe");
    return value+args;
  }

}
