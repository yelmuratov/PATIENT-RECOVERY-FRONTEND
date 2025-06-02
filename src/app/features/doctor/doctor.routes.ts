import { Routes } from '@angular/router';
import { DoctorComponent } from '../../shared/component/doctor/doctor.component';
import { CreateDoctorComponent } from '../../shared/component/create-doctor/create-doctor.component';
import { EditDoctorComponent } from '../../shared/component/edit-doctor/edit-doctor.component';
import { DoctorDetailComponent } from '../../shared/component/doctor-detail/doctor-detail.component';


// Routes

export const DOCTOR_ROUTES: Routes = [
  { path: '', component: DoctorComponent },
  { path: 'create', component: CreateDoctorComponent },
  { path: 'edit/:id', component: EditDoctorComponent },
  { path: ':id', component: DoctorDetailComponent }
];
