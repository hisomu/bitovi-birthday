import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayHeaderComponent } from './birthday-header.component';

describe('BirthdayHeaderComponent', () => {
	let component: BirthdayHeaderComponent;
	let fixture: ComponentFixture<BirthdayHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ BirthdayHeaderComponent ],
			schemas: [NO_ERRORS_SCHEMA] // enables shallow-testing of angular components
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BirthdayHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});
});
