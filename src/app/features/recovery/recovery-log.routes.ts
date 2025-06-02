import { Routes } from '@angular/router';
import { RecoveryLogComponent } from '../../shared/component/recoverylog/recoverylog.component';
import { CreateRecoveryLogComponent } from '../../shared/component/create-recovery/create-recovery.component';
import { EditRecoveryLogComponent } from '../../shared/component/edit-recovery/edit-recovery.component';
import { RecoveryLogDetailComponent } from '../../shared/component/recovery-detail/recovery-detail.component';
import { RecoveryLogByPatientComponent } from '../../shared/component/recovery-by-patient/recovery-by-patient.component';
import { RecoveryLogByDoctorComponent } from '../../shared/component/recovery-by-doctor/recovery-by-doctor.component';

export const RECOVERY_LOG_ROUTES: Routes = [
  {
    path: '',
    component: RecoveryLogComponent 
  },
  {
    path: 'create',
    component: CreateRecoveryLogComponent
  },
  {
    path: 'create/:patientId',
    component: CreateRecoveryLogComponent
  },
  {
    path: 'edit/:id',
    component: EditRecoveryLogComponent
  },
  {
    path: 'patient/:patientId',
    component: RecoveryLogByPatientComponent
  },
  {
    path: 'doctor/:doctorId',
    component: RecoveryLogByDoctorComponent
  },
  {
    path: 'details/:id', 
    component: RecoveryLogDetailComponent
  }
];
