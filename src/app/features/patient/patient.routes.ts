import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { PatientComponent } from '../../shared/component/patient/patient.component';
import { CreatePatientComponent } from '../../shared/component/create-patient/create-patient.component';
import { EditPatientComponent } from '../../shared/component/edit-patient/edit-patient.component';
import { PatientsByDoctorComponent } from '../../shared/component/patient-by-doctor/patient-by-doctor.component';
import { PatientDetailComponent } from '../../shared/component/patient-detail/patient-detail.component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientComponent // List all patients
  },
  {
    path: 'create',
    component: CreatePatientComponent
  },
  {
    path: 'edit/:id',
    component: EditPatientComponent
  },
  {
    path: 'doctor/:doctorId',
    component: PatientsByDoctorComponent
  },
  {
    path: ':id',
    component: PatientDetailComponent
  }
];

