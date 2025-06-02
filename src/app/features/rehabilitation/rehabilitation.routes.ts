import { Routes } from '@angular/router';
import { RehabilitationComponent } from '../../shared/component/rehabilitation/rehabilitation.component';
import { CreateRehabilitationPlanComponent } from '../../shared/component/create-rehab/create-rehab.component';
import { EditRehabPlanComponent } from '../../shared/component/edit-rehab-plan/edit-rehab-plan.component';
import { UpdateRehabProgressComponent } from '../../shared/component/update-rehab/update-rehab.component';
import { PatientRehabProgressComponent } from '../../shared/component/patient-rehab-progress/patient-rehab-progress.component';

export const REHABILITATION_ROUTES: Routes = [
  {
    path: '',
    component: RehabilitationComponent 
  },
  {
    path: 'create-plan/:patientId',
    component: CreateRehabilitationPlanComponent
  },
  {
    path: 'edit-plan/:id',
    component: EditRehabPlanComponent
  },
  {
    path: 'update-progress/:id',
    component: UpdateRehabProgressComponent
  },
  {
    path: 'progress/:patientId',
    component: PatientRehabProgressComponent
  }
];
