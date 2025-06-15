import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientSearchFilters, PaginatedPatientList } from '../models/patient.models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.apiUrl = `${baseUrl}api/patients`;
  }

  /**
   * Get patients with pagination and search filters
   */
  getPatients(filters: PatientSearchFilters): Observable<PaginatedPatientList> {
    let params = new HttpParams()
      .set('pageNumber', filters.pageNumber.toString())
      .set('pageSize', filters.pageSize.toString());

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.fileNo) {
      params = params.set('fileNo', filters.fileNo.toString());
    }
    if (filters.phoneNumber) {
      params = params.set('phoneNumber', filters.phoneNumber);
    }

    return this.http.get<PaginatedPatientList>(this.apiUrl, { params });
  }

  /**
   * Get a single patient by ID
   */
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new patient
   */
  createPatient(patient: Patient): Observable<string> {
    // Remove id and recordCreationDate as per backend requirements
    const { id, recordCreationDate, ...patientData } = patient;
    return this.http.post<string>(this.apiUrl, patientData);
  }

  /**
   * Update an existing patient
   */
  updatePatient(id: string, patient: Patient): Observable<void> {
    const { recordCreationDate, ...patientData } = patient;
    return this.http.put<void>(`${this.apiUrl}/${id}`, patientData);
  }

  /**
   * Delete a patient
   */
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
