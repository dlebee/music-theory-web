import { Component, OnInit } from "@angular/core";
import { IGuitar } from 'src/models/Guitar';
import { GuitarService } from 'src/services/guitar-service';
import { INote } from 'src/models/note';
import { ChordTypes, IChordDefinition, IChord } from 'src/models/chord';
import { NotesService } from 'src/services/notes.service';
import { ChordsService } from 'src/services/chords-service';
import { zip, combineLatest } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface IChordForm {
    note: INote;
    definition: IChordDefinition;
}

@Component({
    selector: 'chords-page',
    templateUrl: './chords-page.component.html'
})
export class ChordsPageComponent implements OnInit
{
    guitar: IGuitar;
    chords: IChordForm[] = [];
    notes: INote[];
    chordDefinitions: IChordDefinition[];
    compiledChords: IChord[] = [];
    guitarsReversed: boolean = false;
    showAllNotes: boolean = false;

    constructor(private guitarService: GuitarService, private notesService: NotesService, private chordsService: ChordsService) { 

    }

    ngOnInit() {

        combineLatest(this.guitarService.standardTunningGuitar(), this.notesService.getNotes(), this.chordsService.getDefinitions(), (guitar, notes, definitions) => ({guitar, notes, definitions}))
            .subscribe(a => {
                this.guitar = a.guitar;
                this.notes = a.notes;
                this.chordDefinitions = a.definitions;
            });
    }

    newChord() {
        let chord = {
            note: this.notes[0],
            definition: this.chordDefinitions[0]
        };
        this.chords.push(chord);
    }

    removeChord(chord: IChordForm) {
        this.chords = this.chords.filter(t => t != chord);
    }

    refreshChords() {
        zip(... this.chords.map(c => this.chordsService.chord(c.note, c.definition.type)))
            .subscribe(chords => this.compiledChords = chords);
    }
}