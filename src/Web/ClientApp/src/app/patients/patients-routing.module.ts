import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientContainerComponent } from './components/patient-container/patient-container.component';

const routes: Routes = [
  {
    path: '',
    component: PatientContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
