import { Routes } from '@angular/router';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { TableComponent } from './common/components/table/table.component';
import { EmployeeRegComponent } from './common/components/employee-reg/employee-reg.component';
import { SnackbarComponent } from './common/components/snackbar/snackbar.component';
import { HomeComponent } from './common/components/home/home.component';
import { TodolistComponent } from './common/components/todolist/todolist.component';
import { ChangepasswordComponent } from './common/components/changepassword/changepassword.component';
import { SigninComponent } from './common/components/signin/signin.component';
import { SubjectComponent } from './common/components/subject/subject.component';
import { DataComponent } from './common/components/data/data.component';
import { SignalComponent } from './common/components/signal/signal.component';
import { SignalChildComponent } from './common/components/signal-child/signal-child.component';
import { authGuard } from './shared/Guards/auth.guard';
import { loginGuard } from './shared/Guards/login.guard';
import { canDeactivateGuard } from './shared/Guards/can-deactivate.guard';



export const routes: Routes = [
    { path: '', component:SigninComponent,canActivate:[loginGuard]},
    {path:'app', component: NavbarComponent, children: [
        {path:'table',loadComponent:()=>import('./common/components/table/table.component').then(c=>c.TableComponent)},
        { path: 'employee-reg', loadComponent: () => import('./common/components/employee-reg/employee-reg.component').then(c => c.EmployeeRegComponent),canDeactivate:[canDeactivateGuard]},
        {path:'employee-reg/:id/:data',component:EmployeeRegComponent},
        { path: 'snackbar', loadComponent: () => import('./common/components/snackbar/snackbar.component').then(c => c.SnackbarComponent)},
        { path: 'todolist', loadComponent: () => import('./common/components/todolist/todolist.component').then(c => c.TodolistComponent)},
        { path: 'changepassword', loadComponent: () => import('./common/components/changepassword/changepassword.component').then(c => c.ChangepasswordComponent)},
        // { path: 'signin', loadComponent: () => import('./common/components/signin/signin.component').then(c => c.SigninComponent)},
        { path: 'signal', loadComponent: () => import('./common/components/signal/signal.component').then(c => c.SignalComponent)},
        {path:'signalchild',component:SignalChildComponent},
        { path: 'subject', loadComponent: () => import('./common/components/subject/subject.component').then(c => c.SubjectComponent)},
        { path: 'data', loadComponent: () => import('./common/components/data/data.component').then(c => c.DataComponent)},
        {path:'home',component:HomeComponent}
        
    ], canActivate: [authGuard]
},
];

