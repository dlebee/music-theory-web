import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NotesService, } from 'src/services/notes.service';
import { NoteIntervalService } from 'src/services/note-interval.service';
import { INote } from 'src/models/note';
import { INoteInterval } from 'src/models/note-interval';

@Component({
    templateUrl: './note-page.component.html',
    selector: 'note-page'
})
export class NotePageComponent implements OnInit
{
    note: INote;
    noteIntervals: INoteInterval[];

    constructor(private route: ActivatedRoute,
        private noteService: NotesService,
        private noteIntervalService: NoteIntervalService
        ) 
    {

    }

    ngOnInit() {
        
        let noteName = this.route.snapshot.paramMap.get('note');
        this.noteService.getNote(noteName)
            .subscribe(
                note => 
                {
                    this.note = note;
                    this.noteIntervalService.getNoteIntervals(this.note)
                        .subscribe(noteIntervals => {
                            this.noteIntervals = noteIntervals;
                        });
                },
                err => alert(err)
            );
    }
}