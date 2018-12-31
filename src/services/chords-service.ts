import { Injectable } from "@angular/core";
import { NotesService } from './notes.service';
import { NoteIntervalService } from './note-interval.service';
import { INote } from 'src/models/note';
import { Observable } from 'rxjs';
import { IChord, ChordTypes, IChordDefinition } from 'src/models/chord';

@Injectable()
export class ChordsService
{
    private definitions: IChordDefinition[] = [
        { 
            type: ChordTypes.Major,
            title: 'Major Chord', 
            description: 'Major Chords (happy) consists of 1 3 5', 
            symbols: ['1', '3', '5']
        },
        {
            type: ChordTypes.Minor,
            title: 'Minor Chord',
            description: 'Minor chords (emotional) consists of 1 b3 5',
            symbols: ['1', 'b3', '5']
        }
    ];

    constructor(private notesService: NotesService, private noteIntervalService: NoteIntervalService) 
    {

    }

    majorChord(note: INote) : Observable<IChord> {
        return this.chord(note, ChordTypes.Major);   
    }

    minorChord(note: INote) : Observable<IChord> {
        return this.chord(note, ChordTypes.Minor);
    }

    chord(note: INote, type: ChordTypes) : Observable<IChord> {
        return Observable.create(o => {
            let chordDefinition = this.definitions.find(t => t.type == type);
            this.noteIntervalService.getNoteIntervals(note)
                .subscribe(
                    noteIntervals => {
                        let notes = chordDefinition.symbols.map(s => noteIntervals.find(ni => ni.symbol == s).note);
                        let nextResult: IChord = {
                            key: note,
                            type: type,
                            title: chordDefinition.title,
                            notes: notes
                        };
                        o.next(nextResult);
                        o.complete();
                    },
                    err => {
                        o.error(err);
                        o.complete();
                    }
                );
        });
        
    }
}