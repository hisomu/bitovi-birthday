import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {
	static noWhitespace: ValidatorFn = (fg: FormGroup) => {
		// check for no whitespace
		if (!fg.value || fg.value.trim().length === 0)
			return { noWhitespace: true };
	};

	static zeroOrGreater: ValidatorFn = (fg: FormGroup) => {
		if (!(fg.value === 0 || fg.value > 0))
			return { zeroOrGreater: true };
	};

	static twoFieldLimit(field1: string, field2: string, length: number, notEmpty: boolean): ValidatorFn {
		return (control: AbstractControl): { [key: string]: boolean } | null => {
			// check for no whitespace
			const control1 = control.get('groups')
								.get(field1);
			const control2 = control.get('groups')
								.get(field2);
			const control1value = control1 && control1.value ? control1.value.trim() : '';
			const control2value = control2 && control2.value ? control2.value.trim() : '';
			const length1: number = control1value.length;
			const length2: number = control2value.length;
			if (notEmpty) {
				const control1WhiteSpace = (control1 && (!control1.value || control1.value.trim().length === 0));
				const control2WhiteSpace = (control2 && (!control2.value || control2.value.trim().length === 0));
				if (control1WhiteSpace) control1.setErrors({ noWhitespace: true });
				if (control2WhiteSpace) control2.setErrors({ noWhitespace: true });
				if (control1WhiteSpace && control2WhiteSpace) return { noWhitespace: true };

			}
			const limit1 = CustomValidators.limitCheck(control2, length1 + length2 > length);
			const limit2 = CustomValidators.limitCheck(control1, length1 + length2 > length);
			if (!limit1 || !limit2)
				return { badLimit: true };

			return undefined;
		};
	}
	static matchingEmailValue: ValidatorFn = (fg: FormGroup) => {
		if (fg.value.email === '' || fg.value.confirmEmail === '')
			return { matchingEmailValue: false };

		if (!(fg.value.email === fg.value.confirmEmail))
			return { matchingEmailValue: true };
	};
	private static limitCheck(control: AbstractControl, badLimit: boolean): boolean {
		if (control) {
			if (badLimit) {
				control.setErrors({ badLimit: true });

				return false;
			}
			control.setErrors(undefined);

			return true;
		}
	}
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		 return control.parent.invalid && control.touched;
	}
}
