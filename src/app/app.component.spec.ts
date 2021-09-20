import { TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let email: ValidationErrors;
  let password: ValidationErrors;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    email = app.accessForm.controls['email'];
    password = app.accessForm.controls['password'];
  });

  it('should create the app', () => {
    expect(app).toBeDefined();
  });

  it('form is valid when empty fields', () => {
    email.setValue('mail@gmail.com');
    password.setValue('234567');
    expect(app.accessForm.valid).toBeTruthy();
  });

  it('form is invalid when required fields are empty', () => {
    expect(email.errors['required']).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    expect(app.accessForm.invalid).toBeTruthy();
  });

  it('mail pattern error', () => {
    email.setValue('mail.gmail.com');
    expect(email.errors['pattern']).toBeTruthy();
  });

  it('Password length error', () => {
    password.setValue('123');
    expect(password.hasError('minlength')).toBeTruthy();
  });
});
