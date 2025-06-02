import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-doctor',
  imports: [CommonModule, RouterModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">👨‍⚕️ Users</h2>  
      <a routerLink="create" class="px-5 py-2 rounded-lg text-white font-semibold"
         [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">
        ➕ Create Doctor
      </a>
    </div>

    <table class="w-full border-collapse">
      <thead>
        <tr [ngClass]="isDarkMode ? 'bg-slate-700' : 'bg-slate-200'">
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Role</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let doctor of doctors" class="hover:bg-slate-100 dark:hover:bg-slate-700 transition">
          <td class="p-3">{{ doctor.fullName }}</td>
          <td class="p-3">{{ doctor.email }}</td>
          <td class="p-3">{{ getRoleName(doctor.role) }}</td>
          <td class="p-3 flex gap-3">
            <a [routerLink]="['/dashboard/doctor', doctor.id]" class="text-blue-500">View</a>
            <a [routerLink]="['/dashboard/doctor/edit', doctor.id]" class="text-yellow-400">Edit</a>
            <button class="text-red-500" (click)="delete(doctor.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
  `
})
export class DoctorComponent implements OnInit {
  private service = inject(DoctorApiService);
  private theme = inject(ThemeService);
  private destroyRef = inject(DestroyRef);
  
  doctors: DoctorDto[] = [];
  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.service.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.doctors = result.items;  // <-- correctly handle paged response
      });
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.delete(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.doctors = this.doctors.filter(d => d.id !== id);
        });
    }
  }

  getRoleName(role: number): string {
    switch(role) {
      case 0: return 'AdminDoctor';
      case 1: return 'Doctor';
      case 2: return 'Moderator';
      case 3: return 'Patient';
      default: return 'Unknown';
    }
  }
}
