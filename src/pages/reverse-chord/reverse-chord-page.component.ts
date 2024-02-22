import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../..//services/guitar-service';
import { ChordsService } from '../..//services/chords-service';
import { IChord } from '../../models/chord';
import { INote } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { zip } from 'rxjs';
import { IGuitar } from '../../models/guitar';


@Component({
    selector: 'reverse-chord-page-component',
    templateUrl: './reverse-chord-page.component.html'
})
export class ReverseChordPageComponent implements OnInit
{
    notes?: INote[];
    chords?: IChord[];
    guitar?: IGuitar;
    selectedNotes: INote[] = [];
    matchedChords: IChord[] = [];

    constructor(private guitarService: GuitarService, private notesService: NotesService, private chordsService: ChordsService) 
    {

    }

    ngOnInit() {

        this.guitarService.standardTunningGuitar().subscribe(g => this.guitar = g);
        this.notesService.getNotes().subscribe(notes => {
            this.notes = notes;
            zip(... this.notes.map(n => this.chordsService.allChords(n)))
                .subscribe(noteChords => {
                    this.chords = noteChords.reduce<IChord[]>((p, c) => p.concat(c), []);
                });
        });
    }

    noteClicked(note: INote) {
        let indexOf = this.selectedNotes.indexOf(note);
        if (indexOf > -1)
            this.selectedNotes = this.selectedNotes.filter(t => t != note);
        else
            this.selectedNotes.push(note);
    }

    searchPossibleChords() {

        if (!this.chords) {
            return;
        }

        this.matchedChords = this.chords.filter(chord => {
            if (chord.notes.length == this.selectedNotes.length) {
                let missingNotes = chord.notes.filter(t => this.selectedNotes.indexOf(t) === -1);
                if (missingNotes.length == 0)
                    return true;
            }

            return false;
        });
    }

    reset() {
        this.matchedChords = [];
        this.selectedNotes = [];
    }
}