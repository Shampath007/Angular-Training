import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filesize',
  standalone:true
})
export class FilesizePipe implements PipeTransform {

  transform(bytes:any):any  {
    const kb = Math.floor(bytes / 1024);
    const mb = Math.floor(kb / 1024);
    const gb = Math.floor(mb / 1024);
    if(gb > 0) {
    return gb.toFixed(2) + ' GB';
    }
    if (mb > 0) {
      return mb.toFixed(2) + ' MB';
    }
    if(kb>50){
      return 'File Size Exceed 50kb';
    }
    if (kb>0) {
      return kb.toFixed(2) + ' KB';
    }
    if (bytes > 0) {
      return bytes.toFixed(2) + ' Bytes';
    }
  }
 
}
