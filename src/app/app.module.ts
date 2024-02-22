import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesService } from '../services/notes.service';
import { IntervalsService } from '../services/intervals.service';
import { NotesPageComponent } from '../pages/notes/notes-page.component';
import { NoteIntervalService } from '../services/note-interval.service';
import { NotePageComponent } from '../pages/note/note-page.component';
import { GuitarService } from '../services/guitar-service';
import { TestPageComponent } from '../pages/test/test-page.component';
import { ChordsService } from '../services/chords-service';
import { GuitarComponent } from '../components/guitar.component';
import { ChordsPageComponent } from '../pages/chords/chords-page.component';
import { ReverseChordPageComponent } from '../pages/reverse-chord/reverse-chord-page.component';

const services = [NotesService, IntervalsService, NoteIntervalService, GuitarService, ChordsService];
const components = [NotesPageComponent, NotePageComponent, TestPageComponent, GuitarComponent, ChordsPageComponent, ReverseChordPageComponent];

@NgModule({
  declarations: [
    AppComponent, components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
