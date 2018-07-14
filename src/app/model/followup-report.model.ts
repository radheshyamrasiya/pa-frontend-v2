export class FollowupReport {
    programReportList: FollowupProgramReport[];
}

export class FollowupProgramReport {
    programId: number;
    programName: string;
    totalParticipants: number;
    followUpAssignedParticipants: number;
    percentageCompletionOfFollowup: number;
        
    currentFollowUpSessionDate: Date;
    currentFollowUpSessionTopic: string;
        
    followUpCounts: any;
    responseCounts: any;
    volunteerReportList: FollowupVolunteerReport[];
}

export class FollowupVolunteerReport {
    volunteerId: number;
    volunteerName: string;
    volunteerPhone: string;
    followUpAssignedParticipants: number;
    followUpCounts: any;
    responseCounts: any;
    percentageCompletionOfFollowup: number;
}