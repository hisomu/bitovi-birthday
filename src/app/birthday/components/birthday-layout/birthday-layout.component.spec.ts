import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayLayoutComponent } from './birthday-layout.component';

describe('BirthdayLayoutComponent', () => {
	let component: BirthdayLayoutComponent;
	let fixture: ComponentFixture<BirthdayLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ BirthdayLayoutComponent ],
			schemas: [NO_ERRORS_SCHEMA] // enables shallow-testing of angular components
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BirthdayLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});
});
