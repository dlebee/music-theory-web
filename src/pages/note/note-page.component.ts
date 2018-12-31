import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NotesService, } from 'src/services/notes.service';
import { NoteIntervalService } from 'src/services/note-interval.service';
import { INote } from 'src/models/note';
import { INoteInterval } from 'src/models/note-interval';
import { IChord } from 'src/models/chord';
import { ChordsService } from 'src/services/chords-service';

@Component({
    templateUrl: './note-page.component.html',
    selector: 'note-page'
})
export class NotePageComponent implements OnInit
{
    note: INote;
    noteIntervals: INoteInterval[];
    chords: IChord[];

    constructor(private route: ActivatedRoute,
        private noteService: NotesService,
        private noteIntervalService: NoteIntervalService,
        private chordsService: ChordsService
        ) 
    {

    }

    ngOnInit() {
        
        this.chords = [];
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

                    this.chordsService.majorChord(note).subscribe(c => this.chords.push(c));
                    this.chordsService.minorChord(note).subscribe(c => this.chords.push(c));
                },
                err => alert(err)
            );
    }
}