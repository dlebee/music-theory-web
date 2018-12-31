import { INote } from './note';

export enum ChordTypes {
    Major = "major",
    Minor = "minor",
    Deminished = "Deminished",
    MajorSeventh = "MajorSeventh",
    MinorSeventh = "MinorSeventh",
    DominantSeventh = "DominantSeventh",
    Sus2 = "Sus2",
    Sus4 = "Sus4"
}

export interface IChordDefinition {
    type: ChordTypes;
    title: string;
    description: string;
    semitones: number[];
}

export interface IChord
{
    type: ChordTypes;
    title: string;
    key: INote;
    notes: INote[];
}