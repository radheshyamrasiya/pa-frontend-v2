import { Entity, Page, Paging } from './entity.model';

export class CaptureContact extends Entity {
    id: number;
    capturedById: number;
    capturedByName: string;
    capturedDevoteeId: number;
    capturedDevoteeName: string;
    capturedDevoteePhone: string;
    timestamp: string;
}

export class CaptureContactPage extends Page {
    
}