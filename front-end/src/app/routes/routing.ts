import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../components/home/home.component';
import { LoginComponent } from './../components/login/login.component';
import { ListComponent } from './../components/list/list.component';
import { AdminComponent } from './../components/admin/admin.component';
import { AdminhomeComponent } from './../components/adminhome/adminhome.component';

import { GuardService } from './../services/guard.service';

const app_routes:Routes=[ 
	{ path: 'home', component: HomeComponent },
	{ path: 'admin', component: AdminComponent, canActivate:[GuardService],
		children: [
			{path: 'home', component: AdminhomeComponent},
			{path: 'list', component: ListComponent}
		]
	},
	{ path: 'adminShop', component: LoginComponent },
	{ path:'**', pathMatch:'full', redirectTo:'' }
]

export const AppRouting=RouterModule.forRoot(app_routes);