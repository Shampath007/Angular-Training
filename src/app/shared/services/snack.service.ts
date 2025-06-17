import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackdisplayComponent } from '../../common/components/snackdisplay/snackdisplay.component';
import { SnackData } from '../../model/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snack: MatSnackBar) { }
  snackfun:SnackData[]=[
    {message:"info showed successfully",classname:"info",iconname:"check-circle"},
    {message: "warn showed successfully", classname: "warn", iconname: "warning" },
    {message: "info showed successfully", classname: "delete", iconname: "delete" },
    {message: "info showed successfully", classname: "error", iconname: "error" },
  ]
  snackopen(icon:string) {
    const getdata = this.snackfun.find((icn) => icn.iconname === icon);
    console.log("Get", getdata);

    const ref = this.snack.openFromComponent(SnackdisplayComponent, {
      data: {
        content: getdata?.message,
        iconname:getdata?.iconname
      },
      duration:3000,
      panelClass: getdata?.classname,
      verticalPosition: "top"
    })

    return ref;
  }
}
