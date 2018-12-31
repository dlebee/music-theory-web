import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { NotesService } from './notes.service';
import { IntervalsService } from './intervals.service';
import { INoteInterval } from 'src/models/note-interval';
import { INote } from 'src/models/note';

@Injectable()
export class NoteIntervalService
{
    constructor(private notesService: NotesService, private intervalService: IntervalsService) 
    {

    }

    nextNote(notes: INote[], note: INote) : INote {

        if (notes.length == 0)
            throw new Error('cannot send an array of notes that is empty.');

        let noteIndex = notes.indexOf(note);
        if (noteIndex+1 < notes.length)
            return notes[noteIndex+1];

        return notes[0];
    }

    getNoteIntervals(note: INote) : Observable<INoteInterval[]>
    {
        return Observable.create(o => {
            combineLatest(this.notesService.getNotes(), this.intervalService.getIntervals(), (notes, intervals) => ({notes, intervals}))
                .subscribe(pair => {
                
                    let currentNote = pair.notes.find(t => t.name == note.name);

                    let noteIntervals = pair.intervals.map(i => {
                        let noteInterval: INoteInterval = { ... i, note: currentNote };
                        currentNote = this.nextNote(pair.notes, currentNote);
                        return noteInterval;
                    });

                    o.next(noteIntervals);
                    o.complete();
                }, err => {
                    o.error(err);
                    o.complete();
                });
        });
    }
}