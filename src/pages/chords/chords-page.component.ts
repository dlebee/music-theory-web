import { Component, OnInit } from "@angular/core";
import { GuitarService } from '../../services/guitar-service';
import { INote } from '../../models/note';
import { ChordTypes, IChordDefinition, IChord } from '../../models/chord';
import { NotesService } from '../../services/notes.service';
import { ChordsService } from '../../services/chords-service';
import { zip, combineLatest } from 'rxjs';
import { IGuitar } from "../../models/guitar";

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
    guitar?: IGuitar;
    chords: IChordForm[] = [];
    notes?: INote[];
    chordDefinitions?: IChordDefinition[];
    compiledChords: IChord[] = [];
    guitarsReversed: boolean = false;
    showAllNotes: boolean = false;

    constructor(private guitarService: GuitarService, private notesService: NotesService, private chordsService: ChordsService) { 

    }

    ngOnInit() {

        combineLatest([this.guitarService.standardTunningGuitar(), this.notesService.getNotes(), this.chordsService.getDefinitions()])
            .subscribe(a => {
                const [guitar, notes, chordDefinitions] = a;
                this.guitar = guitar;
                this.notes = notes;
                this.chordDefinitions = chordDefinitions;
            });
    }

    newChord() {
        let chord = {
            note: this.notes![0],
            definition: this.chordDefinitions![0]
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