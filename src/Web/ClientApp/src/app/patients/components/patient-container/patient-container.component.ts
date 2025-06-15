import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Patient, PatientSearchFilters, PaginatedPatientList } from '../../models/patient.models';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-container',
  templateUrl: './patient-container.component.html',
  styleUrls: ['./patient-container.component.scss']
})
export class PatientContainerComponent implements OnInit {
  @ViewChild('addPatientModal', { static: true }) addPatientModal!: TemplateRef<any>;
  @ViewChild('updatePatientModal', { static: true }) updatePatientModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal!: TemplateRef<any>;

  patientsData: PaginatedPatientList = {
    items: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  };

  currentFilters: PatientSearchFilters = {
    pageNumber: 1,
    pageSize: 10
  };

  selectedPatient: Patient | null = null;
  patientToDelete: Patient | null = null;
  isLoading = false;
  error: string | null = null;

  // Modal references
  addModalRef?: BsModalRef;
  updateModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  // Subjects for communication with child components
  refreshData$ = new Subject<void>();

  constructor(
    private patientService: PatientService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  /**
   * Load patients based on current filters
   */
  loadPatients(): void {
    this.isLoading = true;
    this.error = null;

    this.patientService.getPatients(this.currentFilters).subscribe({
      next: (data) => {
        this.patientsData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load patients. Please try again.';
        this.isLoading = false;
        console.error('Error loading patients:', error);
      }
    });
  }

  /**
   * Handle search filters change
   */
  onFiltersChange(filters: Partial<PatientSearchFilters>): void {
    this.currentFilters = {
      ...this.currentFilters,
      ...filters,
      pageNumber: 1 // Reset to first page when filters change
    };
    this.loadPatients();
  }

  /**
   * Handle page change
   */
  onPageChange(pageNumber: number): void {
    this.currentFilters.pageNumber = pageNumber;
    this.loadPatients();
  }

  /**
   * Open add patient modal
   */
  openAddPatientModal(): void {
    this.addModalRef = this.modalService.show(this.addPatientModal, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Open update patient modal
   */
  openUpdatePatientModal(patient: Patient): void {
    this.selectedPatient = { ...patient };
    this.updateModalRef = this.modalService.show(this.updatePatientModal, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Open delete confirmation modal
   */
  openDeleteConfirmModal(patient: Patient): void {
    this.patientToDelete = patient;
    this.deleteModalRef = this.modalService.show(this.deleteConfirmModal, {
      backdrop: 'static',
      keyboard: false
    });
  }

  /**
   * Handle patient created
   */
  onPatientCreated(): void {
    this.addModalRef?.hide();
    this.loadPatients();
  }

  /**
   * Handle patient updated
   */
  onPatientUpdated(): void {
    this.updateModalRef?.hide();
    this.selectedPatient = null;
    this.loadPatients();
  }

  /**
   * Handle modal cancelled
   */
  onModalCancelled(): void {
    this.addModalRef?.hide();
    this.updateModalRef?.hide();
    this.selectedPatient = null;
  }

  /**
   * Confirm patient deletion
   */
  confirmDelete(): void {
    if (this.patientToDelete) {
      this.patientService.deletePatient(this.patientToDelete.id!).subscribe({
        next: () => {
          this.deleteModalRef?.hide();
          this.patientToDelete = null;
          this.loadPatients();
        },
        error: (error) => {
          this.error = 'Failed to delete patient. Please try again.';
          console.error('Error deleting patient:', error);
        }
      });
    }
  }

  /**
   * Cancel patient deletion
   */
  cancelDelete(): void {
    this.deleteModalRef?.hide();
    this.patientToDelete = null;
  }
}
