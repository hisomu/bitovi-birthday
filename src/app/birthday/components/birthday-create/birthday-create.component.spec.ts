import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { BirthdayService } from '@app/birthday/services';
import { MaterialModule } from '@app/shared';

import { BirthdayCreateComponent } from './birthday-create.component';

describe('BirthdayCreateComponent', () => {
	let component: BirthdayCreateComponent;
	let fixture: ComponentFixture<BirthdayCreateComponent>;
	const router = {
		navigate: jasmine.createSpy('birthdays')    // to spy on the url that has been routed
	};
	let mockBirthdayService;

	beforeEach(async () => {
		mockBirthdayService = jasmine.createSpyObj(['save$']);

		await TestBed.configureTestingModule({
			declarations: [ BirthdayCreateComponent ],
			imports: [
				MaterialModule,
				NoopAnimationsModule,
				RouterTestingModule,
				ReactiveFormsModule
			],
			providers: [
				{ provide: BirthdayService, useValue: mockBirthdayService },
				{ provide: Router, useValue: router }
			],
			schemas: [NO_ERRORS_SCHEMA] // enables shallow-testing of angular components
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BirthdayCreateComponent);
		component = fixture.componentInstance;

		mockBirthdayService.save$.and.returnValue(of(undefined));
	});

	it('should create', () => {
		fixture.detectChanges();
		expect(component)
			.toBeTruthy();
	});

	it('should save and reset', () => {
		fixture.detectChanges();
		setForm();
		component.addBirthday(true);

		expect(mockBirthdayService.save$)
			.toHaveBeenCalled();

		expect(component.stepper.selectedIndex)
			.toEqual(0);
	});

	it('should save and submit', () => {
		fixture.detectChanges();
		setForm();
		component.addBirthday(false);

		expect(mockBirthdayService.save$)
			.toHaveBeenCalled();
		expect(router.navigate)
			.toHaveBeenCalled();
		expect(router.navigate)
			.toHaveBeenCalledWith(['birthdays']);
	});

	it('should be able to create multiple birthdays', fakeAsync(() => {
		fixture.detectChanges();
		setForm();

		tick(1000);

		expect(component.birthday.name)
			.toEqual('Homer Simpson');
		expect(component.birthday.email)
			.toEqual('homer.simpson@gmail.com');
		expect(component.birthday.birthDay.toString())
			.toEqual('12');

		component.addBirthday(true);

		component.nameFormGroup.controls.name.setValue('Marge Simpson');
		component.emailFormGroup.controls.email.setValue('marge.simpson@gmail.com');
		component.monthFormGroup.controls.month.setValue('October');
		component.dayFormGroup.controls.day.setValue('1');
		component.yearFormGroup.controls.year.setValue('1956');

		component.stepper.selectedIndex = 5;

		tick(1000);

		expect(component.birthday.name)
			.toEqual('Marge Simpson');
		expect(component.birthday.email)
			.toEqual('marge.simpson@gmail.com');
		expect(component.birthday.birthDay.toString())
			.toEqual('1');

		component.addBirthday(false);

		expect(mockBirthdayService.save$)
			.toHaveBeenCalledTimes(2);
	}));

	function setForm(): void {
		component.nameFormGroup.controls.name.setValue('Homer Simpson');
		component.emailFormGroup.controls.email.setValue('homer.simpson@gmail.com');
		component.monthFormGroup.controls.month.setValue('May');
		component.dayFormGroup.controls.day.setValue('12');
		component.yearFormGroup.controls.year.setValue('1956');

		component.stepper.selectedIndex = 5;
	}
});
