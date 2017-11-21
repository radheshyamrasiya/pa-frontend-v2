import { Paging } from './paging.model';

export class ProgramAssignment {
    id: number;
    programId: number;
    programName: string;
    attendeeId: number;
    attendeeName: string;
}

export class ProgramAssignmentPage {
    programAssignmentList: ProgramAssignment[];
    paging: Paging;
}