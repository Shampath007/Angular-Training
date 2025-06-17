import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { PageTipComponent } from '../page-tip/page-tip.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../../shared/services/dialog.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../shared/services/employee.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  status: string;
  symbol: string;
}
@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatPaginator, MatSortModule, PageTipComponent,
    MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatSnackBarModule, FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
}) 

export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogbox', { static: false }) dialogbox!: TemplateRef<HTMLElement>;
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, status: 'inactive', symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, status: 'active', symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, status: 'inactive', symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, status: 'active', symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, status: 'active', symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, status: 'active', symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, status: 'inactive', symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, status: 'active', symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, status: 'inactive', symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, status: 'active', symbol: 'Ne' },
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'status', 'symbol', 'action']; 
  dataSource!: any; 
  constructor(private router: Router,
    private authService: AuthService, private dialog: MatDialog, private dialogService: DialogService,
    private snackBar: MatSnackBar, private httpService: EmployeeService) { }
  ngOnInit(): void {
    this.httpService.getposts().subscribe((res: any) => {
      console.log("getresponse", res);
    }, (err: any) => {
      console.log('err', err);
    }) 
    this.httpService.addpost().subscribe((res: any) => {
      console.log("addresponse", res);
    })
    this.httpService.updatepost().subscribe((res: any) => {
      console.log("updateresponse", res);
    })
    this.httpService.deletepost().subscribe((res: any) => {
      console.log("deleteresponse", res);
    })
    this.authService.messages.next("Table");
    this.authService.messages.subscribe(res => {
      console.log("Table Comp", res);
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  title = 'Employee';
  description = "Hello Everyone";
  actionArray = [{ label: 'Active Employees', value: 'active' }, { label: 'inactive Employees', value: 'inactive' }]
  onEmit(event: any) {
    console.log("OnEmit", event);
    const filtereddata = this.ELEMENT_DATA.filter(x => x.status === event.value);
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtereddata);
    this.dataSource.paginator = this.paginator;
  }
  onRowclick(item: any) {
    console.log('row', item);
    this.router.navigate(['/app/employee-reg', item.position, 'view']);
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log("searchValue", searchValue);
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }
  onCreate(item: any) {
    this.router.navigate(['/app/employee-reg', item.position, 'create']);
  }
  onEdit(item: any) {
    this.router.navigate(['/app/employee-reg', item.position, 'edit']);
  }
  onView(item: any) {
    this.router.navigate(['/app/employee-reg', item.position, 'view']);
  }
  onDelete(item: PeriodicElement) {
    console.log("delete");
    const ref = this.dialogService.openConfirmationDialog('Are u want to delete this record?');
    console.log(ref);
    ref.afterClosed().subscribe((res: any) => {
      if (res) {
        const index = this.ELEMENT_DATA.findIndex((x: any) => x.position === item.position);
        if (index !== -1) {
          this.ELEMENT_DATA.splice(index, 1);
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          // this.snackBar.open('Data Deleted Successfully','ok',{duration:3000}); 

        }
      }

    })
  }
  show() {
    console.log("show success");
    const ref = this.dialogService.showConfirmationDialog("Data Entered Successfully");
    ref.afterClosed().subscribe(res => {
      console.log(res);
      //  this.snackBar.open("Information showed Successfully",'ok',{duration:3000});
      if (res) {
        console.log(res);

      }
    })


  }
  warning() {
    console.log("warning");
    const ref = this.dialogService.warn("Please Enter Correct Data");
    ref.afterClosed().subscribe(res => {
      console.log(res);
      //  this.snackBar.open("Warning showed Successfully",'ok',{duration:3000});
      if (res) {
        console.log(res);
      }
    })


  }
  error() {
    console.log("error");
    const ref = this.dialogService.error("Something went wrong");
    ref.afterClosed().subscribe(res => {
      console.log(res);
      //   this.snackBar.open("Error showed Successfully",'ok',{duration:3000});
      if (res) {
        console.log(res);

      }
    })


  }
}
