export class FollowupListGetQuery {
    id: number;
    schemeId: number;
    
    programId: number;
    programName: string;
    
    startDate: Date;
    endDate: Date;
    
    volunteerId: number;
    
    devoteeId: number;
    devoteeName: string;
    devoteePhone: number;

    task1: string;
    description1: string;
    deadline1: Date;
    task1Completion: Date;
    
    task2: string;
    description2: string;
    deadline2: Date;
    task2Completion: Date;

    task3: string;
    description3: string;
    deadline3: Date;
    task3Completion: Date;

    task4: string;
    description4: string;
    deadline4: Date;
    task4Completion: Date;

    task5: string;
    description5: string;
    deadline5: Date;
    task5Completion: Date;

    response: string;
    lastResponse: string;
}