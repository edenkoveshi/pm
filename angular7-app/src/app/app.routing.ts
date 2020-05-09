import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component'

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'pmtable', component: MainpageComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);