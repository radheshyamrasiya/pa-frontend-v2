import { Entity, Page, Paging } from './entity.model';

export class Program extends Entity{
    id: number;
    name: string;
    mentorId: number;
    parentYatraId: number;
    description: string;
    address: string;
    mapLocation: string;
    type: string;
    targetAudience: string;
    followupDescription: string[];
}

export class ProgramPage extends Page{
    
}