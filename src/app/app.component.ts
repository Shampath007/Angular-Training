import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_training';
  constructor(private authservice:AuthService){}
  ngOnInit(){
    this.authservice.getmessages();
  }
}
