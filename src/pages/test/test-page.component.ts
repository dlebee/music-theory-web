import { Component, OnInit } from '@angular/core';
import { GuitarService } from 'src/services/guitar-service';
import { IGuitar } from 'src/models/Guitar';
import { ChordsService } from 'src/services/chords-service';
import { NotesService } from 'src/services/notes.service';
import { IChord } from 'src/models/chord';

@Component({
    selector: 'test-page',
    templateUrl: './test-page.component.html'
})
export class TestPageComponent implements OnInit
{
    guitar: IGuitar;
    debug: IChord;
    constructor(private guitarService: GuitarService, private notesService: NotesService, private chordsService: ChordsService) {

    }

    ngOnInit() {
        this.guitarService.standardTunningGuitar()
            .subscribe(g => this.guitar = g);

        this.notesService.getNote('A').subscribe(aNote => {
            this.chordsService.majorChord(aNote).subscribe(aMajorChord => {
                this.debug = aMajorChord;
            });
        });

        
    }
}