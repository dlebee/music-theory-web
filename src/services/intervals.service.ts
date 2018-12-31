import { Injectable } from '@angular/core';

export interface IInterval
{
    intervalSymbol: string;
    name: string;
    distanceInHalfTones: number;
}

@Injectable()
export class IntervalsService
{  
    static Intervals: Array<IInterval> = [
        { distanceInHalfTones: 0, name: 'tonic', intervalSymbol: '1'},
        { distanceInHalfTones: 1, name: 'minor second', intervalSymbol: 'b2'},
        { distanceInHalfTones: 2, name: 'major second', intervalSymbol: '2'},
        { distanceInHalfTones: 3, name: 'minor third', intervalSymbol: 'b3'},
        { distanceInHalfTones: 4, name: 'major third', intervalSymbol: '3'},
        { distanceInHalfTones: 5, name: 'perfect fourth', intervalSymbol: '4'},
        { distanceInHalfTones: 6, name: 'tritone', intervalSymbol: '4# / b5'},
        { distanceInHalfTones: 7, name: 'perfect fifth', intervalSymbol: '5'},
        { distanceInHalfTones: 8, name: 'minor sixth', intervalSymbol: 'b6'},
        { distanceInHalfTones: 9, name: 'major sixth', intervalSymbol: '6'},
        { distanceInHalfTones: 10, name: 'minor seventh', intervalSymbol: 'b7'},
        { distanceInHalfTones: 11, name: 'major seventh', intervalSymbol: '7'},
        { distanceInHalfTones: 12, name: 'octave', intervalSymbol: '8'},
    ];

    constructor() {

    }
}