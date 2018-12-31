import { Injectable } from '@angular/core';
import { NotesService, INote } from './notes.service';
import { IntervalsService, IInterval } from './intervals.service';
import { Observable, combineLatest } from 'rxjs';

export interface INoteInterval extends IInterval
{
    note: INote;
}

@Injectable()
export class NoteIntervalService
{
    constructor(private notesService: NotesService, private intervalService: IntervalsService) 
    {

    }

    getNoteIntervals(note: INote) : Observable<INoteInterval[]>
    {
        return Observable.create(o => {
            combineLatest(this.notesService.getNotes(), this.intervalService.getIntervals(), (notes, intervals) => ({notes, intervals}))
                .subscribe(pair => {
                    
                    let indexOfNote = pair.notes.findIndex(n => n.name == note.name);
                    let noteIntervals = pair.intervals.map(i => {
                        let noteInterval: INoteInterval = { ... i, note: pair.notes[indexOfNote] };

                        // resolve next note.
                        indexOfNote++;
                        if (indexOfNote == pair.notes.length)
                            indexOfNote = 0;

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