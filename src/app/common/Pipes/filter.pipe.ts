import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone:true,
})
export class FilterPipe implements PipeTransform {

  transform(value:any[], field:string,filterValue:string): any {
    if(value&&value.length>0){
      return value.filter(x=>x[field]===filterValue);
    }
    else{
      return [];
    }
  }

}
