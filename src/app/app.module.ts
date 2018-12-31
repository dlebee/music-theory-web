import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesService } from 'src/services/notes.service';
import { IntervalsService } from 'src/services/intervals.service';
import { NotesPageComponent } from 'src/pages/notes/notes-page.component';

const services = [NotesService, IntervalsService];
const components = [NotesPageComponent];

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
