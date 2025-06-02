import { Routes } from '@angular/router';
import { MyRecoveryComponent } from '../../shared/patient-components/my-recovery/my-recovery.component';
import { MySymptomsComponent } from '../../shared/patient-components/my-symtoms/my-symtoms.component';
import { SystemAdviceComponent } from '../../shared/patient-components/system-advice/system-advice.component';
import { MyPrescriptionsComponent } from '../../shared/patient-components/my-prescriptions/my-prescriptions.component';
import { MyRehabPlanComponent } from '../../shared/patient-components/my-rehab-plan/my-rehab-plan.component';

export const PATIENT_DASHBOARD_ROUTES: Routes = [
  {
    path: 'my-recovery',
    component: MyRecoveryComponent
  },
  {
    path: 'my-symptoms',
    component: MySymptomsComponent
  },
  {
    path: 'system-advice',
    component: SystemAdviceComponent
  },
  {
    path: 'my-prescriptions',
    component: MyPrescriptionsComponent
  },
  {
    path: 'rehab-plan',
    component: MyRehabPlanComponent
  }
];
