import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DoctorApiService, DoctorDto } from '../../../core/services/doctor-api.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-edit-doctor',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto"
       [ngClass]="isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'">

    <h2 class="text-3xl font-bold mb-6">✏️ Edit Doctor</h2>

    <form *ngIf="doctor" (ngSubmit)="save()" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">

        <input class="p-3 border rounded col-span-2" 
               [(ngModel)]="doctor.fullName" 
               name="fullName" 
               placeholder="Full Name" 
               required />

        <input class="p-3 border rounded col-span-2" 
               [(ngModel)]="doctor.email" 
               name="email" 
               type="email" 
               placeholder="Email" 
               required />

        <input class="p-3 border rounded col-span-2" 
               [(ngModel)]="doctor.password" 
               name="password" 
               type="password" 
               placeholder="Password (leave empty to keep current)" />

<select class="p-3 border rounded col-span-2"
        [ngClass]="isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'"
        [(ngModel)]="doctor.role" 
        name="role" 
        required>
  <option [ngValue]="0">AdminDoctor</option>
  <option [ngValue]="1">Doctor</option>
  <option [ngValue]="2">Moderator</option>
  <option [ngValue]="3">Patient</option>
</select>


      </div>

      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2 rounded-lg text-white font-semibold"
                [ngClass]="isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'">Update</button>
                  <button type="button" (click)="cancel()" class="px-6 py-2 rounded-lg font-semibold"
          [ngClass]="isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-black hover:bg-gray-300'">
    Cancel
  </button>
      </div>
      <div class="flex gap-3">


</div>

    </form>

  </div>
  `
})
export class EditDoctorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(DoctorApiService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private theme = inject(ThemeService);

  doctorId!: number;
  doctor: {
    fullName: string;
    email: string;
    password: string;
    role: number;
  } = { fullName: '', email: '', password: '', role: 1 };

  isDarkMode = false;

  ngOnInit() {
    this.theme.loadTheme();
    this.theme.darkModeChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(dark => this.isDarkMode = dark);

    this.doctorId = +this.route.snapshot.params['id'];
    this.service.getById(this.doctorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.doctor = {
          fullName: data.fullName,
          email: data.email,
          password: '',  // keep empty by default
          role: data.role
        };
      });
  }

  save() {
    const payload = {
      fullName: this.doctor.fullName,
      email: this.doctor.email,
      password: this.doctor.password,  // if empty, backend can handle to not update password
      role: this.doctor.role
    };

    this.service.update(this.doctorId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/dashboard/doctor']));
  }
  cancel() {
  this.router.navigate(['/dashboard/doctor']);
}
}
