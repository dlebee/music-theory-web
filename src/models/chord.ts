import { INote } from './note';

export enum ChordTypes {
    Major = "major",
    Minor = "minor"
}

export interface IChordDefinition {
    type: ChordTypes;
    title: string;
    description: string;
    symbols: string[];
}

export interface IChord
{
    type: ChordTypes;
    title: string;
    key: INote;
    notes: INote[];
}