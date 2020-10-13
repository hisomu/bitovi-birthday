import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BirthdayModule } from '@app/birthday';
import { SharedModule } from '@app/shared';

import { AppComponent } from './app.component';
//import { HttpTokenInterceptor } from './auth/http-token-interceptor';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		BirthdayModule,

		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule
	],
	exports: [
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	//providers: [
	//	{
	//		provide: HTTP_INTERCEPTORS,
	//		useClass: HttpTokenInterceptor,
	//		multi: true
	//	}
	//],
	bootstrap: [AppComponent]
})
export class AppModule { }
