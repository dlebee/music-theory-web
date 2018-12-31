import { Injectable } from "@angular/core";
import { NotesService } from './notes.service';
import { IGuitar } from 'src/models/Guitar';
import { Observable } from 'rxjs';
import { INote } from 'src/models/note';
import { IGuitarString } from 'src/models/guitar-string';
import { NoteIntervalService } from './note-interval.service';

@Injectable()
export class GuitarService
{
    constructor(private notesService: NotesService, private noteIntervalService: NoteIntervalService) {

    }

    standardTunningGuitar(fretCount: number = 24) : Observable<IGuitar> {
        return Observable.create(o => {
            this.notesService.getNotes()
                .subscribe(
                    notes => {

                        let guitar: IGuitar = { 
                            fretCount: fretCount,
                            strings: []
                        };

                        let E = notes.find(t => t.name == "E");
                        let B = notes.find(t => t.name == "B");
                        let G = notes.find(t => t.name == "G");
                        let D = notes.find(t => t.name == "D");
                        let A = notes.find(t => t.name == "A");

                        guitar.strings.push(this.createString(E, notes, fretCount));
                        guitar.strings.push(this.createString(B, notes, fretCount));
                        guitar.strings.push(this.createString(G, notes, fretCount));
                        guitar.strings.push(this.createString(D, notes, fretCount));
                        guitar.strings.push(this.createString(A, notes, fretCount));
                        guitar.strings.push(this.createString(E, notes, fretCount));

                        o.next(guitar);
                        o.complete();
                    },
                    err => {
                        o.error(err);
                        o.complete();
                    }
                );
        });
    }   

    private createString(openStringNote: INote, notes: INote[], fretCount: number) : IGuitarString {

        if (fretCount < 0)
            throw new Error('fretCount must be positive.');

        let ret : IGuitarString = {
            openString: openStringNote,
            frets: []
        };

        let currentNote = openStringNote;
        for(let i = 0 ; i < fretCount; i++) {
            currentNote = this.noteIntervalService.nextNote(notes, currentNote);
            ret.frets.push(currentNote);
        }

        return ret;
    }
}