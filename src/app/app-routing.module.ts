import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';
import { NotePageComponent } from 'src/pages/note/note-page.component';
import { TestPageComponent } from 'src/pages/test/test-page.component';
import { ChordsPageComponent } from 'src/pages/chords/chords-page.component';
import { ReverseChordPageComponent } from 'src/pages/reverse-chord/reverse-chord-page.component';

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
