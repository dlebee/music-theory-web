import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { INote } from '../models/note';

@Injectable()
export class NotesService
{
    getNote(noteName: string): Observable<INote> {

        let note = NotesService.notes.find(n => n.name == noteName || n.alternativeName == noteName);
        if (note)
            return of(note);

        return throwError(() => `could not find a note called ${noteName}`);
    }

    getNotes(): Observable<INote[]> {
        return of(NotesService.notes);
    }

    static notes: Array<INote> = 
    [
        {
            name: 'A',
            isNatural: true,
        }, 
        {
            name: 'A#',
            alternativeName: 'Bb',
            isNatural: false,
        },
        {
            name: 'B',
            isNatural: true,
        },
        {
            name: 'C',
            isNatural: true,
        },
        {
            name: 'C#',
            alternativeName: 'Db',
            isNatural: false,
        },
        {
            name: 'D',
            isNatural: true,
        },
        {
            name: 'D#',
            alternativeName: 'Eb',
            isNatural: false,
        },
        {
            name: 'E',
            isNatural: true,
        },
        {
            name: 'F',
            isNatural: true,
        },
        {
            name: 'F#',
            alternativeName: 'Gb',
            isNatural: false,
        },
        {
            name: 'G',
            isNatural: true,
        },
        {
            name: 'G#',
            alternativeName: 'Ab',
            isNatural: false
        }
    ];

    constructor() {

    }
}