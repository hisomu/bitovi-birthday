import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BirthdayCreateComponent, BirthdayLayoutComponent } from '@app/birthday/components';

const routes: Routes = [
	{
		path: '',

		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'birthdays' },

			// birthdays
			{ path: 'birthdays', component: BirthdayLayoutComponent },
			{ path: 'birthdays/new', component: BirthdayCreateComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
