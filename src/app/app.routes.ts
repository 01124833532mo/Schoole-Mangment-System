import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Contactus } from './components/contactus/contactus';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/Account/login/login';
import { Register } from './components/Account/register/register';
import { StudentList } from './components/student/student-list/student-list';
import { StudentAdd } from './components/student/student-add/student-add';
import { StudentDetails } from './components/student/student-details/student-details';
import { DepartmentList } from './components/department/department-list/department-list';
import { DepartmentAdd } from './components/department/department-add/department-add';
import { DepartmentDetails } from './components/department/department-details/department-details';
import { CourseList } from './components/course/course-list/course-list';
import { CourseAdd } from './components/course/course-add/course-add';
import { CourseDetails } from './components/course/course-details/course-details';
import { canloginGuard } from './guards/canlogin-guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About, canActivate: [canloginGuard] },
  { path: 'contactus', component: Contactus },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'students', component: StudentList },
  { path: 'students/add', component: StudentAdd },
  { path: 'students/details/:id', component: StudentDetails },

  { path: 'departments', component: DepartmentList },
  { path: 'departments/add', component: DepartmentAdd },
  { path: 'departments/details/:id', component: DepartmentDetails },

  { path: 'courses', component: CourseList },
  { path: 'courses/add', component: CourseAdd },
  { path: 'courses/details/:id', component: CourseDetails },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: Notfound },
];
