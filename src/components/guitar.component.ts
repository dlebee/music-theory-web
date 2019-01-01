import { Component, Input } from "@angular/core";
import { IGuitar } from 'src/models/Guitar';
import { IGuitarString } from 'src/models/guitar-string';

@Component({
    selector: 'guitar',
    templateUrl: './guitar.component.html',
    styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent
{
  
    readonly firstFretWidth: number = 1.4312;
    readonly distanceBetweenFrets: number = 1.059463;

    @Input() guitarScale: number = 25;  
    @Input() guitar: IGuitar;

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

        let percentage = width * 100 / this.guitarScale;
        return `${percentage}%`;
    }
}