import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NotesService, } from '../../services/notes.service';
import { NoteIntervalService } from '../../services/note-interval.service';
import { INote } from '../../models/note';
import { INoteInterval } from '../../models/note-interval';
import { IChord } from '../../models/chord';
import { ChordsService } from '../../services/chords-service';

@Component({
    templateUrl: './note-page.component.html',
    selector: 'note-page'
})
export class NotePageComponent implements OnInit
{
    note?: INote;
    noteIntervals?: INoteInterval[];
    chords?: IChord[];

    constructor(private route: ActivatedRoute,
        private noteService: NotesService,
        private noteIntervalService: NoteIntervalService,
        private chordsService: ChordsService
        ) 
    {

    }

    ngOnInit() {
        
        let noteName = this.route.snapshot.paramMap.get('note');
        this.noteService.getNote(noteName!)
            .subscribe(note => 
                {
                    this.note = note;
                    this.noteIntervalService.getNoteIntervals(this.note)
                        .subscribe(noteIntervals => {
                            this.noteIntervals = noteIntervals;
                        });

                    this.chordsService.allChords(note).subscribe(chords => this.chords = chords);
                }
            );
    }
}