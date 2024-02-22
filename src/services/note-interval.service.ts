import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, zip } from 'rxjs';
import { NotesService } from './notes.service';
import { IntervalsService } from './intervals.service';
import { INoteInterval } from '../models/note-interval';
import { INote } from '../models/note';

@Injectable()
export class NoteIntervalService {
    constructor(private notesService: NotesService, private intervalService: IntervalsService) {

    }

    nextNote(notes: INote[], note: INote): INote {

        if (notes.length == 0)
            throw new Error('cannot send an array of notes that is empty.');

        let noteIndex = notes.indexOf(note);
        if (noteIndex + 1 < notes.length)
            return notes[noteIndex + 1];

        return notes[0];
    }

    getNoteIntervals(note: INote): Observable<INoteInterval[]> {
        return combineLatest([this.notesService.getNotes(), this.intervalService.getIntervals()])
            .pipe(
                map(pair => {

                    const [notes, intervals] = pair;


                    let currentNote = notes.find(t => t.name == note.name);

                    let noteIntervals = intervals.map(i => {
                        let noteInterval: INoteInterval = { ...i, note: currentNote! };
                        currentNote = this.nextNote(notes, currentNote!);
                        return noteInterval;
                    });

                    return noteIntervals;
                })

            );
    }
}