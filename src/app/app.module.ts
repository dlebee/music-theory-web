import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesService } from 'src/services/notes.service';
import { IntervalsService } from 'src/services/intervals.service';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';
import { NoteIntervalService } from 'src/services/note-interval.service';
import { NotePageComponent } from 'src/pages/note/note-page.component';

const services = [NotesService, IntervalsService, NoteIntervalService];
const components = [NotesPageComponent, NotePageComponent];

@NgModule({
  declarations: [
    AppComponent, components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
