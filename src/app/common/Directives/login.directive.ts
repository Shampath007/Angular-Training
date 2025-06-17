import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogin]'
})
export class LoginDirective {

  constructor(private el:ElementRef,private render:Renderer2) { }
  ngOnInit(){
    console.log("hello");
    const height=this.el.nativeElement.getBoundingClientRect().height;
    console.log(height);
    this.render.setStyle(this.el.nativeElement,'margin-top',`${(window.innerHeight-height)/2.5}px`)
  }

}
