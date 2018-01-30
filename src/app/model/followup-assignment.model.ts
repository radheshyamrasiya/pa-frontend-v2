import { Entity, Page, Paging } from './entity.model';

export class FollowupAssignment extends Entity{
    id: number;
    programId: number;
    programName: string;
    attendeeId: number;
    attendeeName: string;
    attendeePhone: number;
    volunteerId: number;
}

export class FollowupAssignmentPage extends Page{
    
}