import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { Birthday } from '@app/birthday/birthday.models';
import { BirthdayService } from '@app/birthday/services';
import { untilComponentDestroyed } from '@app/shared/component-destroyed';
import { TrackByService } from '@app/shared/services';

@Component({
	selector: 'bt-birthday-create',
	templateUrl: './birthday-create.component.html',
	styleUrls: ['./birthday-create.component.scss']
})
export class BirthdayCreateComponent implements OnDestroy, OnInit {
	@ViewChild('stepper') stepper: MatStepper;

	birthday$ = new BehaviorSubject<Birthday>(undefined);

	nameFormGroup: FormGroup;
	emailFormGroup: FormGroup;
	monthFormGroup: FormGroup;
	dayFormGroup: FormGroup;
	yearFormGroup: FormGroup;

	months: Array<string> = [
		'January',
		'Feburary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	birthday: Birthday = {
		name: '',
		email: ''
	};

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly birthdaySvc: BirthdayService,
		public tbSvc: TrackByService) {}

	ngOnInit(): void {
		this.nameFormGroup = this.fb.group({
			name: ['', Validators.required]
		});
		this.emailFormGroup = this.fb.group({
			email: ['', Validators.pattern(new RegExp('^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]{2,}([\.][a-zA-Z0-9]{2,})+$'))]
		});
		this.monthFormGroup = this.fb.group({
			month: ['', Validators.required]
		});
		this.dayFormGroup = this.fb.group({
			day: ['', [Validators.min(1), Validators.max(31), Validators.pattern('[0-9]*')]]
		});
		this.yearFormGroup = this.fb.group({
			year: ['', [Validators.min(1900), Validators.max((new Date()).getFullYear()), Validators.pattern('[0-9]*')]]
		});

		this.nameFormGroup
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.birthday.name = this.nameFormGroup.controls.name.value ? this.nameFormGroup.controls.name.value.trim() : '';
			});
		this.emailFormGroup
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.birthday.email = this.emailFormGroup.controls.email.value ? this.emailFormGroup.controls.email.value.trim() : '';
			});
		this.monthFormGroup
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.birthday.birthMonth = this.monthFormGroup.controls.month.value ? this.monthFormGroup.controls.month.value.trim() : 0;
			});
		this.dayFormGroup
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.birthday.birthDay = this.dayFormGroup.controls.day.value ? this.dayFormGroup.controls.day.value.trim() : 0;
			});
		this.yearFormGroup
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.birthday.birthYear = this.yearFormGroup.controls.year.value ? this.yearFormGroup.controls.year.value.trim() : 0;
			});
	}

	ngOnDestroy(): void {
		/** Linter want, Linter get */
	}

	addBirthday(reset: boolean): void {
		this.birthdaySvc.save$(this.birthday)
		.pipe(take(1))
		.subscribe(
			() => {
				// reset the variables
				this.birthday = {
					name: '',
					email: ''
				};
				if (reset)
					this.stepper.reset();
				else
					this.router.navigate(['birthdays']);
			});
	}
}
