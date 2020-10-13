import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContentLoaderModule } from '@ngneat/content-loader';

import { MaterialModule } from './material.module';

@NgModule({
	imports: [
		CommonModule,
		ContentLoaderModule,
		MaterialModule,
		RouterModule,
		ReactiveFormsModule,
		FlexLayoutModule
	],
	exports: [
		ContentLoaderModule,
		MaterialModule,
		RouterModule,
		ReactiveFormsModule,
		FlexLayoutModule
	]
})
export class SharedModule { }
