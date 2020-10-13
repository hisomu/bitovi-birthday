import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Birthday } from '@app/birthday';
import { BirthdayService } from '@app/birthday/services';

@Component({
	selector: 'bt-birthday-layout',
	templateUrl: './birthday-layout.component.html',
	styleUrls: ['./birthday-layout.component.scss']
})
export class BirthdayLayoutComponent implements OnInit {

	birthday$ = new BehaviorSubject<Array<Birthday>>(undefined);

	@ViewChild('birthdaySearch') birthdaySearch;

	constructor(
		private readonly birthdaySvc: BirthdayService
	) { }

	ngOnInit(): void {
		this.birthdaySvc.getBirthdays$()
			.pipe(take(1))
			.subscribe(birthdays => this.birthday$.next(birthdays));
	}

	runSearch(search: FormGroup): void {
		const filter: Birthday = {
			name: search.controls.name.value,
			email: search.controls.email.value
		};

		// push undefined to start the spinner
		this.birthday$.next(undefined);

		this.birthdaySvc.filterBirthdays(filter)
			.pipe(take(1))
			.subscribe(birthdays => this.birthday$.next(birthdays));
	}

	clearSearch(): void {
		this.birthdaySearch.reset();
		this.birthdaySvc.getBirthdays$()
			.pipe(take(1))
			.subscribe(birthdays => this.birthday$.next(birthdays));
	}
}
