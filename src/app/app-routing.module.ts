import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPageComponent } from '../pages/notes/notes-page.component';
import { NotePageComponent } from '../pages/note/note-page.component';
import { TestPageComponent } from '../pages/test/test-page.component';
import { ChordsPageComponent } from '../pages/chords/chords-page.component';
import { ReverseChordPageComponent } from '../pages/reverse-chord/reverse-chord-page.component';

const routes: Routes = [
  { path: '', component: NotesPageComponent },
  { path: 'note/:note', component: NotePageComponent},
  { path: 'chords', component: ChordsPageComponent},
  { path: 'reverse-chords', component: ReverseChordPageComponent},
  { path: 'test', component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
