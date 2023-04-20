import { FormGroup } from "@angular/forms";
import { AbstractControl, ValidatorFn } from "@angular/forms";

export class Utility {
    static confirmPasswordValidator(form: FormGroup): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (form.controls['password'].value !== form.controls['confirmPassword'].value)
                return { 'passwordMismatch': true };
            return null;
        }
    }

    static generateArray(length: number) {
      return new Array(length);
    }
}