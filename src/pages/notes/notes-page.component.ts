import { Component, OnInit } from '@angular/core';
import { NotesService, INote } from 'src/services/notes.service';


@Component({
    templateUrl: './notes-page.component.html',
    selector: 'notes-page'
})
export class NotesPageComponent implements OnInit
{
    notes: Array<INote>;
    constructor(private notesService: NotesService) {

    }

    ngOnInit(): void {
        this.notesService
            .getNotes()
            .subscribe(notes => this.notes = notes);
    }
}