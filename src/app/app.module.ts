import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesService } from 'src/services/notes.service';
import { IntervalsService } from 'src/services/intervals.service';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';
import { NoteIntervalService } from 'src/services/note-interval.service';
import { NotePageComponent } from 'src/pages/note/note-page.component';
import { GuitarService } from 'src/services/guitar-service';
import { TestPageComponent } from 'src/pages/test/test-page.component';
import { ChordsService } from 'src/services/chords-service';
import { GuitarComponent } from 'src/components/guitar.component';
import { ChordsPageComponent } from 'src/pages/chords/chords-page.component';

const services = [NotesService, IntervalsService, NoteIntervalService, GuitarService, ChordsService];
const components = [NotesPageComponent, NotePageComponent, TestPageComponent, GuitarComponent, ChordsPageComponent];

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
