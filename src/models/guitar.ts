import { IGuitarString } from './guitar-string';

export interface IGuitar
{
    fretCount: number;
    strings: IGuitarString[];
}