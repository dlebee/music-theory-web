import { Injectable } from '@angular/core';

export interface IInterval
{
    intervalSymbol: string;
    name: string;
}

@Injectable()
export class IntervalsService
{  
    static Intervals: Array<IInterval> = [
        { name: 'tonic', intervalSymbol: '1'},
        { name: 'minor second', intervalSymbol: 'b2'},
        { name: 'major second', intervalSymbol: '2'},
        { name: 'minor third', intervalSymbol: 'b3'},
        { name: 'major third', intervalSymbol: '3'},
        { name: 'perfect fourth', intervalSymbol: '4'},
        { name: 'tritone', intervalSymbol: '4# / b5'},
        { name: 'perfect fifth', intervalSymbol: '5'},
        { name: 'minor sixth', intervalSymbol: 'b6'},
        { name: 'major sixth', intervalSymbol: '6'},
        { name: 'minor seventh', intervalSymbol: 'b7'},
        { name: 'major seventh', intervalSymbol: '7'},
        { name: 'octave', intervalSymbol: '8'},
    ];

    constructor() {

    }
}