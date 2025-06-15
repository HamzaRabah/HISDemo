import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.models';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.scss']
})
export class PatientUpdateComponent implements OnInit, OnChanges {
  @Input() patient: Patient | null = null;
  @Output() patientUpdated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  patientForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  originalFileNo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.patient) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.populateForm();
    }
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
   * Populate form with patient data
   */
  private populateForm(): void {
    if (!this.patient) return;

    this.originalFileNo = this.patient.fileNo;

    this.patientForm.patchValue({
      name: this.patient.name || '',
      fileNo: this.patient.fileNo || '',
      citizenId: this.patient.citizenId || '',
      birthdate: this.formatDateForInput(this.patient.birthdate),
      gender: this.patient.gender || 0,
      nationality: this.patient.nationality || '',
      firstVisitDate: this.formatDateForInput(this.patient.firstVisitDate),
      phoneNumber: this.patient.phoneNumber || '',
      email: this.patient.email || '',
      country: this.patient.country || '',
      city: this.patient.city || '',
      street: this.patient.street || '',
      address1: this.patient.address1 || '',
      address2: this.patient.address2 || '',
      contactPerson: this.patient.contactPerson || '',
      contactRelation: this.patient.contactRelation || '',
      contactPhone: this.patient.contactPhone || ''
    });

    // Clear any previous errors
    this.error = null;
  }

  /**
   * Format date for HTML input (YYYY-MM-DD)
   */
  private formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
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
   * Check if form has changes from original data
   */
  hasChanges(): boolean {
    if (!this.patient) return false;

    const formValue = this.patientForm.value;

    return (
      formValue.name !== this.patient.name ||
      parseInt(formValue.fileNo) !== this.patient.fileNo ||
      formValue.citizenId !== this.patient.citizenId ||
      formValue.birthdate !== this.formatDateForInput(this.patient.birthdate) ||
      parseInt(formValue.gender) !== this.patient.gender ||
      formValue.nationality !== this.patient.nationality ||
      formValue.firstVisitDate !== this.formatDateForInput(this.patient.firstVisitDate) ||
      formValue.phoneNumber !== (this.patient.phoneNumber || '') ||
      formValue.email !== (this.patient.email || '') ||
      formValue.country !== (this.patient.country || '') ||
      formValue.city !== (this.patient.city || '') ||
      formValue.street !== (this.patient.street || '') ||
      formValue.address1 !== (this.patient.address1 || '') ||
      formValue.address2 !== (this.patient.address2 || '') ||
      formValue.contactPerson !== (this.patient.contactPerson || '') ||
      formValue.contactRelation !== (this.patient.contactRelation || '') ||
      formValue.contactPhone !== (this.patient.contactPhone || '')
    );
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.patientForm.valid && this.patient) {
      this.isSubmitting = true;
      this.error = null;

      const formValue = this.patientForm.value;

      // Convert form data to Patient object
      const updatedPatient: Patient = {
        ...formValue,
        id: this.patient.id,
        fileNo: parseInt(formValue.fileNo, 10),
        birthdate: new Date(formValue.birthdate),
        firstVisitDate: new Date(formValue.firstVisitDate),
        gender: parseInt(formValue.gender, 10),
        recordCreationDate: this.patient.recordCreationDate
      };

      this.patientService.updatePatient(this.patient.id!, updatedPatient).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.patientUpdated.emit();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.error = this.getErrorMessage(error);
          console.error('Error updating patient:', error);
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
    if (error.status === 404) {
      return 'Patient not found. It may have been deleted by another user.';
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
   * Reset form to original patient data
   */
  resetForm(): void {
    if (this.patient) {
      this.populateForm();
    }
  }
}
