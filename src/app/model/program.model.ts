import { Paging } from './paging.model';

export class Program {
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

export class ProgramPage {
    programList: Program[];
    paging: Paging;
}