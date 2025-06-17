import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SnackService } from '../../../shared/services/snack.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-snackbar',
  imports: [MatButtonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  constructor(private snackservice:SnackService,private authService:AuthService){}
  ngOnInit(){
    this.authService.messages.next("Snack");
    this.authService.messages.subscribe(res => {
      console.log("Snackbar Comp", res);
    });
  }
  snackshow() {
    const ref = this.snackservice.snackopen("check-circle");
  }
  snackwarn() {
    const ref = this.snackservice.snackopen("warning");
  }
  snackdelete() {
    const ref = this.snackservice.snackopen("delete");
  }
  snackerror() {
    const ref = this.snackservice.snackopen("error");
  }

}
