import { Injectable } from "@angular/core";
import { NotesService } from './notes.service';
import { NoteIntervalService } from './note-interval.service';
import { INote } from 'src/models/note';
import { Observable, zip, of } from 'rxjs';
import { IChord, ChordTypes, IChordDefinition } from 'src/models/chord';

@Injectable()
export class ChordsService
{
    private definitions: IChordDefinition[] = [
        { 
            type: ChordTypes.Major,
            title: 'Major', 
            description: 'Major chords sound happy and simple.', 
            semitones: [0, 4, 7]
        },
        {
            type: ChordTypes.Minor,
            title: 'Minor',
            description: 'Minor chords are considered to be sad, or ‘serious.’',
            semitones: [0, 3, 7],
        },
        {
            type: ChordTypes.Deminished,
            title: 'Diminished',
            description: 'Diminished Chords sound tense and unpleasant.',
            semitones: [0, 3, 6]
        },
        {
            type: ChordTypes.MajorSeventh,
            title: 'Major Seventh',
            description: 'Major seventh chords are considered to be thoughtful, soft (Jazzy)',
            semitones: [0, 4, 7, 11]
        },
        {
            type: ChordTypes.MinorSeventh,
            title: 'Minor Seventh',
            description: 'Minor seventh chords are considered to be moody, or contemplative',
            semitones: [0, 3, 7, 10]
        },
        {
            type: ChordTypes.DominantSeventh,
            title: 'Dominant Seventh',
            description: 'Dominant seventh chords are considered to be strong and restless (jazz and blues, as well as jazz inspired r&b, hip hop, & EDM.)',
            semitones: [0, 4, 7, 10]
        },
        {
            type: ChordTypes.Sus2,
            title: 'Sus2',
            description: 'Sus2 Chords sound bright and nervous.',
            semitones: [0, 2, 7]
        },
        {
            type: ChordTypes.Sus4,
            title: 'Sus4',
            description: 'Sus4 Chords, like Sus2 chords, sound bright and nervous.',
            semitones: [0, 5, 7]
        },
        {
            type: ChordTypes.Augmented,
            title: 'Augmented',
            description: 'Augmented chords sound anxious and suspenseful.',
            semitones: [0, 4, 8]
        },
        {
            type: ChordTypes.DominantNinth,
            title: 'Dominant Ninth',
            description: 'common in jazz, funk, and R&B',
            semitones: [0, 4, 7, 10, 14]
        },
        {
            type: ChordTypes.MajorEleventh,
            title: 'Major Eleventh',
            description: 'common in jazz, funk, and R&B',
            semitones: [0, 4, 7, 11, 14, 17]
        }
    ];

    constructor(private notesService: NotesService, private noteIntervalService: NoteIntervalService) 
    {

    }

    getDefinitions() : Observable<IChordDefinition[]> {
        return of(this.definitions);
    }

    majorChord(note: INote) : Observable<IChord> {
        return this.chord(note, ChordTypes.Major);   
    }

    minorChord(note: INote) : Observable<IChord> {
        return this.chord(note, ChordTypes.Minor);
    }

    allChords(note: INote) : Observable<IChord[]> {
        return Observable.create(o => {
            let observables = this.definitions.map(cd => this.chord(note, cd.type));
            zip (... observables).subscribe(
                res => {
                    o.next(res);
                    o.complete();
                },
                err => {
                    o.error(err);
                    o.complete();
                }
            );
        });
    }

    chord(note: INote, type: ChordTypes) : Observable<IChord> {
        return Observable.create(o => {
            let chordDefinition = this.definitions.find(t => t.type == type);
            this.noteIntervalService.getNoteIntervals(note)
                .subscribe(
                    noteIntervals => {



                        let notes = chordDefinition.semitones.map(s => {
                            let finalSemiTone = this.safeSemiTone(s);
                            let noteInterval = noteIntervals.find(ni => ni.distanceInHalfTones == finalSemiTone);
                            return noteInterval.note;
                        });

                        let nextResult: IChord = {
                            key: note,
                            type: type,
                            title: chordDefinition.title,
                            notes: notes
                        };
                        o.next(nextResult);
                        o.complete();
                    },
                    err => {
                        o.error(err);
                        o.complete();
                    }
                );
        });
        
    }
    
    protected safeSemiTone(semiTone: number): number {
        return semiTone <= 12 ? semiTone : semiTone-12;
    }
}