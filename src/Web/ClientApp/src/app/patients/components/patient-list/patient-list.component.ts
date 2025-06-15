import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Patient, PaginatedPatientList } from '../../models/patient.models';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
  @Input() patientsData: PaginatedPatientList = {
    items: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  };
  @Input() isLoading = false;
  @Input() currentPage = 1;
  @Input() pageSize = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() editPatient = new EventEmitter<Patient>();
  @Output() deletePatient = new EventEmitter<Patient>();

  /**
   * Get gender display text
   */
  getGenderText(gender: number): string {
    return gender === 0 ? 'Male' : 'Female';
  }

  /**
   * Format date for display
   */
  formatDate(date: Date | string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  /**
   * Handle edit patient click
   */
  onEditPatient(patient: Patient): void {
    this.editPatient.emit(patient);
  }

  /**
   * Handle delete patient click
   */
  onDeletePatient(patient: Patient): void {
    this.deletePatient.emit(patient);
  }

  /**
   * Handle page change
   */
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.patientsData.totalPages) {
      this.pageChange.emit(page);
    }
  }

  /**
   * Get array of page numbers for pagination
   */
  getPageNumbers(): number[] {
    const totalPages = this.patientsData.totalPages;
    const currentPage = this.patientsData.currentPage;
    const pages: number[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page and surrounding pages
      pages.push(1);

      if (currentPage > 4) {
        pages.push(-1); // Placeholder for "..."
      }

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push(-1); // Placeholder for "..."
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }

  /**
   * Get showing text for pagination info
   */
  getShowingText(): string {
    if (this.patientsData.totalCount === 0) {
      return 'No patients found';
    }

    const start = (this.patientsData.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.patientsData.totalCount);

    return `Showing ${start} to ${end} of ${this.patientsData.totalCount} patients`;
  }

  /**
   * TrackBy function for better performance
   */
  trackByPatientId(index: number, patient: Patient): string {
    return patient.id || index.toString();
  }
}
