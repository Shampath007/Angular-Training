import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone:true
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args: any): any {
    console.log('value',value);
    console.log('args',args);
    if (!args) {
      console.log('inside if args');
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);
    console.log('re ',re);
    console.log('match ',match);
    // If there's no match, just return the original value.
    if (!match) {
      console.log("inside match if");
      return value;
    }
    const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>");
    console.log("replaced value ",replacedValue);
    return replacedValue;

}
}
