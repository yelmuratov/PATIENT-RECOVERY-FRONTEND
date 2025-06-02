import { Routes } from '@angular/router';
import { ConsultationComponent } from '../../shared/component/consultation/consultation.component';
import { AskConsultationComponent } from '../../shared/component/ask-consultation/ask-consultation.component';
import { ConsultationDetailComponent } from '../../shared/component/consultation-detail/consultation-detail.component';
import { ReplyConsultationComponent } from '../../shared/component/consultation-reply/consultation-reply.component';
import { PatientConsultationListComponent } from '../../shared/component/patient-consultation-link/patient-consultation-link.component';

export const CONSULTATION_ROUTES: Routes = [
  {
    path: '',
    component: ConsultationComponent
  },
  {
    path: 'ask/:patientId',
    component: AskConsultationComponent
  },
  {
    path: 'patient/:patientId',
    component: PatientConsultationListComponent
  },
  {
    path: ':id',
    component: ConsultationDetailComponent
  },
  {
    path: 'reply/:consultationId',
    component: ReplyConsultationComponent
  }
];
