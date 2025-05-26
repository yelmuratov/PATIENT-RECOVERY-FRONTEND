import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Consultation Feature Works!</h2>`
})
export class ConsultationComponent {}

@Component({
  standalone: true,
  template: `<h2>Ask Consultation</h2>`
})
export class AskConsultationComponent {}

@Component({
  standalone: true,
  template: `<h2>Patient Consultation List</h2>`
})
export class PatientConsultationListComponent {}

@Component({
  standalone: true,
  template: `<h2>Consultation Detail</h2>`
})
export class ConsultationDetailComponent {}

@Component({
  standalone: true,
  template: `<h2>Reply to Consultation</h2>`
})
export class ReplyConsultationComponent {}

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
