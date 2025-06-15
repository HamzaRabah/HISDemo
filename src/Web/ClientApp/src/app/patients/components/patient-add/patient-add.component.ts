import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.models';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {
  @Output() patientCreated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  patientForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
    // Set default values
    this.patientForm.patchValue({
      firstVisitDate: this.getTodayDateString(),
      birthdate: ''
    });
  }

  /**
   * Create the reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      // Required fields
      name: ['', [Validators.required, Validators.maxLength(200)]],
      fileNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      citizenId: ['', [Validators.required, Validators.maxLength(50)]],
      birthdate: ['', [Validators.required]],
      gender: [0, [Validators.required]],
      nationality: ['', [Validators.required, Validators.maxLength(100)]],
      firstVisitDate: ['', [Validators.required]],

      // Optional fields
      phoneNumber: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      country: ['', [Validators.maxLength(100)]],
      city: ['', [Validators.maxLength(100)]],
      street: ['', [Validators.maxLength(200)]],
      address1: ['', [Validators.maxLength(200)]],
      address2: ['', [Validators.maxLength(200)]],
      contactPerson: ['', [Validators.maxLength(200)]],
      contactRelation: ['', [Validators.maxLength(100)]],
      contactPhone: ['', [Validators.maxLength(20)]]
    });
  }

  /**
   * Get today's date in YYYY-MM-DD format
   */
  private getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  /**
   * Check if a field has validation errors and has been touched
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get validation error message for a field
   */
  getFieldError(fieldName: string): string {
    const field = this.patientForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['pattern']) return 'Please enter a valid number';
    if (errors['maxlength']) return `${this.getFieldLabel(fieldName)} is too long`;

    return 'Please enter a valid value';
  }

  /**
   * Get human-readable field label
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      fileNo: 'File Number',
      citizenId: 'Citizen ID',
      birthdate: 'Birth Date',
      gender: 'Gender',
      nationality: 'Nationality',
      phoneNumber: 'Phone Number',
      email: 'Email',
      country: 'Country',
      city: 'City',
      street: 'Street',
      address1: 'Address 1',
      address2: 'Address 2',
      contactPerson: 'Contact Person',
      contactRelation: 'Contact Relation',
      contactPhone: 'Contact Phone',
      firstVisitDate: 'First Visit Date'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      const formValue = this.patientForm.value;

      // Convert form data to Patient object
      const patient: Patient = {
        ...formValue,
        fileNo: parseInt(formValue.fileNo, 10),
        birthdate: new Date(formValue.birthdate),
        firstVisitDate: new Date(formValue.firstVisitDate),
        gender: parseInt(formValue.gender, 10)
      };

      this.patientService.createPatient(patient).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.patientCreated.emit();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.error = this.getErrorMessage(error);
          console.error('Error creating patient:', error);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  /**
   * Mark all form fields as touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.patientForm.controls).forEach(key => {
      this.patientForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Get user-friendly error message
   */
  private getErrorMessage(error: any): string {
    if (error.status === 400) {
      if (error.error && typeof error.error === 'string') {
        return error.error;
      }
      if (error.error && error.error.errors) {
        // Handle validation errors from backend
        const validationErrors = error.error.errors;
        const errorMessages = Object.keys(validationErrors)
          .map(key => validationErrors[key].join(', '))
          .join('; ');
        return errorMessages || 'Please check the form for errors.';
      }
      return 'Please check the form for errors.';
    }
    if (error.status === 409) {
      return 'A patient with this File Number already exists.';
    }
    return 'An unexpected error occurred. Please try again.';
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancelled.emit();
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.patientForm.reset();
    this.error = null;
    this.ngOnInit(); // Reset default values
  }
}
