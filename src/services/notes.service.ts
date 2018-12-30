import { Injectable } from '@angular/core';

export interface INote
{
    name: string;
    alternativeName?: string;
    isNatural: boolean;
}

@Injectable()
export class NotesService
{
    static notes: INote[] = 
    [
        {
            name: 'A',
            isNatural: true,
        }, 
        {
            name: 'A#',
            isNatural: false,
        },
        {
            name: 'B',
            isNatural: true,
        },
        {
            name: 'C',
            isNatural: true,
        },
        {
            name: 'C#',
            isNatural: false,
        },
        {
            name: 'D',
            isNatural: true,
        },
        {
            name: 'D#',
            isNatural: false,
        },
        {
            name: 'E',
            isNatural: true,
        },
        {
            name: 'F',
            isNatural: true,
        },
        {
            name: 'F#',
            isNatural: false,
        },
        {
            name: 'G',
            isNatural: true,
        },
        {
            name: 'G#',
            isNatural: false
        }
    ];

    constructor() {

    }
}