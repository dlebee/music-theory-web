import { IInterval } from './interval';
import { INote } from './note';

export interface INoteInterval extends IInterval
{
    note: INote;
}