import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindingComponent } from './finding/finding.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:'', component:FindingComponent},
  {path:'result', component:ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
