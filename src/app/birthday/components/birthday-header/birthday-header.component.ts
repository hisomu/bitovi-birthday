import { Component, Input } from '@angular/core';

import { Birthday } from '@app/birthday/birthday.models';

@Component({
	selector: 'bt-birthday-header',
	templateUrl: './birthday-header.component.html',
	styleUrls: ['./birthday-header.component.scss']
})
export class BirthdayHeaderComponent {
	@Input() birthday: Birthday;
}
