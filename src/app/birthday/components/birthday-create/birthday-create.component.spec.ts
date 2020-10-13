import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

	function setForm(): void {
		component.nameFormGroup.controls.name.setValue('Homer Simpson');
		component.emailFormGroup.controls.email.setValue('homer.simpson@gmail.com');
		component.monthFormGroup.controls.month.setValue('5');
		component.dayFormGroup.controls.day.setValue('12');
		component.yearFormGroup.controls.year.setValue('1956');

		component.stepper.selectedIndex = 5;
	}
});
