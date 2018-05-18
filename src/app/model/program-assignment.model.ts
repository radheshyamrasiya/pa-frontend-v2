import { Entity, Page, Paging } from './entity.model';

export class ProgramAssignment extends Entity{
    id: number;
    programId: number;
    programName: string;
    attendeeId: number;
    attendeeName: string;
    attendeePhone: string;
    attendeeEmail: string;
}

export class ProgramAssignmentPage extends Page{
    
}