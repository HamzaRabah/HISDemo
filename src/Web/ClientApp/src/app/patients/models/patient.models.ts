export interface Patient {
  id?: string;
  name: string;
  fileNo: number;
  citizenId: string;
  birthdate: Date;
  gender: number; // 0 = Male, 1 = Female
  nationality: string;
  phoneNumber?: string;
  email?: string;
  country?: string;
  city?: string;
  street?: string;
  address1?: string;
  address2?: string;
  contactPerson?: string;
  contactRelation?: string;
  contactPhone?: string;
  firstVisitDate: Date;
  recordCreationDate?: Date;
}

export interface PatientSearchFilters {
  name?: string;
  fileNo?: number;
  phoneNumber?: string;
  pageNumber: number;
  pageSize: number;
}

export interface PaginatedPatientList {
  items: Patient[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
