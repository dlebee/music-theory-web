import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IGuitar } from '../models/Guitar';
import { IGuitarString } from '../models/guitar-string';
import { INote } from '../models/note';

@Component({
    selector: 'guitar',
    templateUrl: './guitar.component.html',
    styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent
{
  
    readonly firstFretWidth: number = 1.4312;
    readonly distanceBetweenFrets: number = 1.059463;

    @Input() necksSize: number = 19;  
    @Input() guitar: IGuitar;
    @Input() showNotes: boolean = true;
    @Input() notes: INote[];
    @Input() reversed: boolean;

    @Output() noteClicked = new EventEmitter<INote>();

    constructor() {
        
    }

    getStringWidth(s: IGuitarString) {
        return 0.5 + (0.5 * this.guitar.strings.indexOf(s)) + 'px';
    }

    getFretWidth(index: number) {

        if (index == 0)
            return '40px';   

        let width = this.firstFretWidth;
        for(let i = 2; i <= index;i++) {
            width /= this.distanceBetweenFrets;
        }

        let percentage = width * 100 / this.necksSize;
        return `${percentage}%`;
    }

    emitNoteClicked(note: INote) {
        this.noteClicked.emit(note);
    }

    get finalStrings() {
        return this.reversed ? this.guitar.strings.slice().reverse() : this.guitar.strings;
    }

    isNoteAskedFor(note: INote) {
        return this.notes && this.notes.indexOf(note) > -1;
    }

    showThisNote(note: INote) {
        return this.showNotes ? true : this.isNoteAskedFor(note);
    }
}