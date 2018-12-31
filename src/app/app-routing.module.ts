import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';
import { NotePageComponent } from 'src/pages/note/note-page.component';
import { TestPageComponent } from 'src/pages/test/test-page.component';

const routes: Routes = [
  { path: '', component: NotesPageComponent },
  { path: 'note/:note', component: NotePageComponent},
  { path: 'test', component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
