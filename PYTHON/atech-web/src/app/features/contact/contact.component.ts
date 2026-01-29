import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;
  showSuccessDialog = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      console.log(this.contactForm.value);

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.showSuccessDialog = true;
        this.contactForm.reset();
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
