import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/services/notes.service';


@Component({
    templateUrl: './notes-page.component.html',
    selector: 'notes-page'
})
export class NotesPageComponent implements OnInit
{
    constructor(private notesService: NotesService) {

    }

    ngOnInit(): void {

    }
}