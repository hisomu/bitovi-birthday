import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, filter } from 'rxjs/operators';

import { untilComponentDestroyed } from '@app/shared/component-destroyed';
import { TrackByService } from '@app/shared/services';

@Component({
	selector: 'bt-birthday-list-search-bar',
	templateUrl: './birthday-list-search-bar.component.html',
	styleUrls: ['./birthday-list-search-bar.component.scss']
})
export class BirthdayListSearchBarComponent implements OnDestroy, OnInit {

	@Output() readonly valueChanges = new EventEmitter<FormGroup>();
	searchForm: FormGroup;

	constructor(private readonly fb: FormBuilder, public tbSvc: TrackByService) { }

	ngOnInit(): void {

		this.searchForm = this.fb.group({
			email: [''],
			name: [''],
			month: [''],
			day: [''],
			year: ['']
		});

		this.searchForm
			.valueChanges
			.pipe(
				untilComponentDestroyed(this),
				debounceTime(800) // let them keep typing before submitting a request
			)
			.subscribe(() => {
				this.valueChanges.emit(this.searchForm);
			});
	}

	ngOnDestroy(): void {
		/** Linter want, Linter get */
	}

	reset(): void {
		this.searchForm.reset();
	}
}
