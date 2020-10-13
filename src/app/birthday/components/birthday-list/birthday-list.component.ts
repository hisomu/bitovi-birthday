import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';

import { Birthday } from '@app/birthday';
import { untilComponentDestroyed } from '@app/shared/component-destroyed';
import { TrackByService } from '@app/shared/services';

@Component({
	selector: 'bt-birthday-list',
	templateUrl: './birthday-list.component.html',
	styleUrls: ['./birthday-list.component.scss']
})
export class BirthdayListComponent implements AfterViewInit, OnDestroy {

	@Input() birthday$: Observable<Array<Birthday>>;
	@Output() readonly resetSearch = new EventEmitter();

	dataSource: MatTableDataSource<Birthday>;
	displayedColumns = [];
	columns: Array<any>;
	loadingList = true;
	resultCount = 0;
	refreshCount = 0;
	@ViewChild('colName') colName: TemplateRef<any>;
	@ViewChild('colEmail') colEmail: TemplateRef<any>;
	@ViewChild('colMonth') colMonth: TemplateRef<any>;
	@ViewChild('colDay') colDay: TemplateRef<any>;
	@ViewChild('colYear') colYear: TemplateRef<any>;

	private sort: MatSort;

	constructor(
		private readonly cd: ChangeDetectorRef,
		public tbSvc: TrackByService) {
		this.dataSource = new MatTableDataSource();
	}

	@ViewChild(MatSort) set matSort(ms: MatSort) {
		this.sort = ms;
		this.dataSource.sort = this.sort;
	}

	ngAfterViewInit(): void {
		// setup columns
		this.columns = [
			{ id: 'name', val: 'Name', template: this.colName, flex: '' },
			{ id: 'email', val: 'Email', template: this.colEmail, flex: '120px' },
			{ id: 'birthMonth', val: 'Month', template: this.colMonth, flex: '120px' },
			{ id: 'birthDay', val: 'Day', template: this.colDay, flex: '180px' },
			{ id: 'birthYear', val: 'Year', template: this.colYear, flex: '100px', class: 'no' }
		];

		// setup up which colums are displayed (it's all of em right now)
		this.displayedColumns = this.columns.map(col => col.id);

		this.birthday$
			.pipe(untilComponentDestroyed(this))
			.subscribe(
				birthdays => {
					this.loadingList = true;

					if (birthdays) {
						this.dataSource = new MatTableDataSource(birthdays);
						this.dataSource.sort = this.sort;
						this.resultCount = birthdays.length;
						this.refreshCount++;
					}

					this.loadingList = false;
					this.cd.detectChanges();
			});
	}

	ngOnDestroy(): void {
		/** Linter want, Linter get */
	}

	searchReset(): void {
		this.resetSearch.emit();
	}
}
