import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { INote } from '../../models/note';


@Component({
    templateUrl: './notes-page.component.html',
    selector: 'notes-page'
})
export class NotesPageComponent implements OnInit
{
    notes: Array<INote> = [];

    constructor(private notesService: NotesService) {

    }

    ngOnInit(): void {
        this.notesService
            .getNotes()
            .subscribe(notes => this.notes = notes);
    }
}