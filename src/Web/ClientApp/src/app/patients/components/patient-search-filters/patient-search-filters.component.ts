import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PatientSearchFilters } from '../../models/patient.models';

@Component({
  selector: 'app-patient-search-filters',
  templateUrl: './patient-search-filters.component.html',
  styleUrls: ['./patient-search-filters.component.scss']
})
export class PatientSearchFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<Partial<PatientSearchFilters>>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: [''],
      fileNo: [''],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    // Auto-search as user types (with debounce)
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500), // Wait 500ms after user stops typing
        distinctUntilChanged() // Only emit if form value actually changed
      )
      .subscribe(values => {
        this.emitFilters(values);
      });
  }

  /**
   * Handle search button click
   */
  onSearch(): void {
    const formValues = this.searchForm.value;
    this.emitFilters(formValues);
  }

  /**
   * Clear all filters
   */
  onClear(): void {
    this.searchForm.reset();
    this.emitFilters({});
  }

  /**
   * Emit filter changes to parent component
   */
  private emitFilters(values: any): void {
    const filters: Partial<PatientSearchFilters> = {};

    // Only include non-empty values
    if (values.name && values.name.trim()) {
      filters.name = values.name.trim();
    }

    if (values.fileNo && !isNaN(values.fileNo)) {
      filters.fileNo = parseInt(values.fileNo, 10);
    }

    if (values.phoneNumber && values.phoneNumber.trim()) {
      filters.phoneNumber = values.phoneNumber.trim();
    }

    this.filtersChange.emit(filters);
  }

  /**
   * Handle Enter key press in form fields
   */
  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearch();
    }
  }
}
