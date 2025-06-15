import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientContainerComponent } from './components/patient-container/patient-container.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientSearchFiltersComponent } from './components/patient-search-filters/patient-search-filters.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientUpdateComponent } from './components/patient-update/patient-update.component';

@NgModule({
  declarations: [
    PatientContainerComponent,
    PatientListComponent,
    PatientSearchFiltersComponent,
    PatientAddComponent,
    PatientUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PatientsRoutingModule,
    ModalModule.forChild()
  ]
})
export class PatientsModule { }
