import { Component, OnInit } from '@angular/core';
import { GuitarService } from '../../services/guitar-service';
import { ChordsService } from '../../services/chords-service';
import { NotesService } from '../../services/notes.service';
import { IGuitar } from '../../models/guitar';

@Component({
    selector: 'test-page',
    templateUrl: './test-page.component.html'
})
export class TestPageComponent implements OnInit
{
    guitar?: IGuitar;
    
    constructor(private guitarService: GuitarService, private notesService: NotesService, private chordsService: ChordsService) {

    }

    ngOnInit() {
        this.guitarService.standardTunningGuitar()
            .subscribe(g => this.guitar = g);
        
    }
}