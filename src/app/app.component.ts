import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface ValidationError {
  controlName: string;
  name: string;
  value: any;
}

export interface Controls {
  [key: string]: AbstractControl;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  accessForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.accessForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      remindToggle: new FormControl(''),
    });
  }

  ngOnInit() {}

  private obtainAllErrors(controls: Controls): ValidationError[] {
    let errors: ValidationError[] = [];
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      errors.push(...this.controlErrors(key, control));
    });
    return errors;
  }

  private controlErrors(
    key: string,
    control: AbstractControl
  ): ValidationError[] {
    let errors: ValidationError[] = [];
    if (control instanceof FormGroup) {
      errors = errors.concat(this.obtainAllErrors(control.controls));
    }
    const controlErrors = control.errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((error) => {
        errors.push({
          controlName: key,
          name: error,
          value: controlErrors[error],
        });
      });
    }
    return errors;
  }

  private errorsMessage(errors: ValidationError[]) {
    if (errors) {
      let text: string = '';
      errors.forEach((error, index) => {
        if (index > 0) {
          text += ' y ';
        }
        switch (error.name) {
          case 'required':
            text += `${error.controlName} está requerido`;
            break;
          case 'pattern':
            text += `${error.controlName} no es correcto`;
            break;
          case 'email':
            text += `Formato de ${error.controlName} no es correcto`;
            break;
          case 'minlength':
            text +=
              error.controlName +
              ' tiene menos de ' +
              error.value['requiredLength'] +
              ' caracteres';
            break;
          default:
            text += `${error.controlName}: ${error.name}`;
        }
      });
      return text;
    }
    return;
  }

  public showMessage(key: string, control: AbstractControl) {
    const errors = this.controlErrors(key, control);
    return this.errorsMessage(errors);
  }

  public onSubmit() {
    if (!this.accessForm.valid) {
      const errors: ValidationError[] = this.obtainAllErrors(
        this.accessForm.controls
      );
      window.alert(this.errorsMessage(errors));
    } else {
      window.alert('Accesso se ha procesado correctamente!');
    }
  }
}
