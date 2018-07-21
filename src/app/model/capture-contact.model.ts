import { Entity, Page, Paging } from './entity.model';
import { Devotee } from './devotee.model'

export class CaptureContact extends Entity {
    id: number;
    capturedById: number;
    capturedByName: string;
    capturedDevoteeId: number;
    capturedDevoteeName: string;
    capturedDevoteePhone: string;
    introducedAt: string;
    timestamp: string;
}

export class CaptureContactPage extends Page {
    
}


export class CaptureContactRequest extends Entity {
    id: number;
    capturedById: number;
    introducedAt: string;
    timestamp: Date;
    programInterestedIn: number;
    rating: number;
    introComments: string;
    capturedDevotee: Devotee;
}