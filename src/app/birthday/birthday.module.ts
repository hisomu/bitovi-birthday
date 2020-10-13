import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule, SharedModule } from '@app/shared';

import { BirthdayCreateComponent } from './components/birthday-create/birthday-create.component';
import { BirthdayHeaderComponent } from './components/birthday-header/birthday-header.component';
import { BirthdayLayoutComponent } from './components/birthday-layout/birthday-layout.component';
import { BirthdayListSearchBarComponent } from './components/birthday-list-search-bar/birthday-list-search-bar.component';
import { BirthdayListComponent } from './components/birthday-list/birthday-list.component';

@NgModule({
	declarations: [BirthdayHeaderComponent, BirthdayLayoutComponent, BirthdayListComponent, BirthdayListSearchBarComponent, BirthdayCreateComponent ],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule
	],
	providers: [
		TitleCasePipe
	]
})
export class BirthdayModule { }
