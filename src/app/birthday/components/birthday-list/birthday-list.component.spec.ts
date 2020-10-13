import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Birthday } from '@app/birthday/birthday.models';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { BirthdayListComponent } from './birthday-list.component';

describe('BirthdayListComponent', () => {
	let component: BirthdayListComponent;
	let fixture: ComponentFixture<BirthdayListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ BirthdayListComponent ],
			schemas: [NO_ERRORS_SCHEMA] // enables shallow-testing of angular components
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BirthdayListComponent);
		component = fixture.componentInstance;

		component.birthday$ = of(undefined);

		fixture.detectChanges();
	});

	const mockBirthDayService = {
		getBirthdays(): Observable<Array<Birthday>> {
			return of(undefined);
		}
	};

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});
});
