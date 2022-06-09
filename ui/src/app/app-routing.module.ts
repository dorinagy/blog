import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
 import { BlogPostDetailsComponent } from './blogpost-details/blogpost-details.component';
import { BlogPostListComponent } from './blogpost-list/blogpost-list.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
   {
    path: 'blogposts',
    component: BlogPostListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogposts/:id',
    component: BlogPostDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
