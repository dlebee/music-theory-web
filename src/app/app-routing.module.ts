import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';

const routes: Routes = [
  { path: '', component: NotesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
