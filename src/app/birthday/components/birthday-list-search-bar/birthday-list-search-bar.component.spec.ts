import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BirthdayListSearchBarComponent } from './birthday-list-search-bar.component';

describe('BirthdayListSearchBarComponent', () => {
	let component: BirthdayListSearchBarComponent;
	let fixture: ComponentFixture<BirthdayListSearchBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ BirthdayListSearchBarComponent ],
			imports: [
				ReactiveFormsModule
			],
			schemas: [NO_ERRORS_SCHEMA] // enables shallow-testing of angular components
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BirthdayListSearchBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component)
			.toBeTruthy();
	});
});
