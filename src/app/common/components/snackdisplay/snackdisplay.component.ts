import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackdisplay',
  imports: [MatIcon,FormsModule,CommonModule],
  templateUrl: './snackdisplay.component.html',
  styleUrl: './snackdisplay.component.css'
})
export class SnackdisplayComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
  