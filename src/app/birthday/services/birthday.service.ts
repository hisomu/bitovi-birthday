import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay } from 'rxjs/operators';

import { Birthday } from '../birthday.models';

@Injectable({
	providedIn: 'root'
})
export class BirthdayService {
	private readonly _birthdays = new BehaviorSubject<Array<Birthday>>(undefined);

	getBirthdays$(): Observable<Array<Birthday>> {
		return this._birthdays
			.asObservable()
			.pipe(
				filter(birthdays => birthdays !== undefined)
			);
	}

	filterBirthdays(birthday: Birthday): Observable<Array<Birthday>> {
		const filterVal = Object.values(birthday)
			.reduce((acc, cur) => `${acc} + ${cur}`, '');

		// if the filter has no values return the whole collection
		if (!filterVal) return this.getBirthdays$();

		return this._birthdays
			.asObservable()
			.pipe(
				filter(birthdays => birthdays !== undefined),
				map(birthdays => birthdays
					.filter(b => {
						let found = true;

						if (birthday.name.length > 0)
							found = b.name.includes(birthday.name);
						if (birthday.email.length > 0)
							found = found && b.email.includes(birthday.email);
						if (birthday.birthMonth > 0)
							found = found && b.birthMonth === birthday.birthMonth;
						if (birthday.birthDay > 0)
							found = found && b.birthDay === birthday.birthDay;
						if (birthday.birthYear > 0)
							found = found && b.birthYear === birthday.birthYear;

						return found;
					})
				)
			);
	}

	updateSubject(birthday: Birthday): void {
		const list = this._birthdays.value ? this._birthdays.value : new Array<Birthday>();
		list.push(birthday);
		this._birthdays.next(list);
	}

	sortSubject(): void {
		let list = this._birthdays.value;
		list = list.sort((a, b) => a.name.localeCompare(b.name));
		this._birthdays.next(list);
	}

	save$(birthday: Birthday): Observable<Birthday> {
		return new Observable<Birthday>(observer => {
			observer.next(birthday);
			this.updateSubject(birthday);
			this.sortSubject();
			observer.complete();
		});
	}
}
