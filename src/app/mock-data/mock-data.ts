import { FollowupDevotees } from '../model-frontend/follwoup-devotees.model';
import { FollowupListGetQuery } from '../model-get/followup-list-get-query.model';
 
export const mockFollowupDevotees: FollowupDevotees[] = [
    {
        programId: 1,
        programName: 'First Program',
        devoteeList: [
            {
                id: 1,
                name: 'hari',
                phone: '9886709603',
                area: 'bangalore',
                pin: '560043',
            },
            {
                id: 2,
                name: 'Krishna',
                phone: '8880076000',
                area: 'bangalore',
                pin: '560043',
            }
        ]
    },
    {
        programId: 2,
        programName: 'Second Program',
        devoteeList: [
            {
                id: 3,
                name: 'Kumar',
                phone: '9888889603',
                area: 'bangalore',
                pin: '560043',
            },
            {
                id: 2,
                name: 'Basava',
                phone: '9990088000',
                area: 'bangalore',
                pin: '560043',
            }
        ]
    }
];

export const mockHttpGetFollowupList: FollowupListGetQuery[] = [
    {
        id: 1,
        schemeId: 1,
        
        programId: 1,
        programName: "Sample Program",
        
        startDate: new Date("12/10/16"),
        endDate: new Date("19/10/16"),
        
        volunteerId: 1,
        devoteeId: 2,
        devoteeName: "Kumar",
        devoteePhone: 8886578666,
    
        task1: "Send SMS",
        description1: "Thanks for coming to the program",
        deadline1: new Date("13/10/16"),
        task1Completion: new Date(),
        
        task2: "Call for the program",
        description2: "Invitation Call",
        deadline2: new Date("16/10/16"),
        task2Completion: new Date(),
    
        task3: "",
        description3: "",
        deadline3: new Date(),
        task3Completion: new Date(),
    
        task4: "",
        description4: "",
        deadline4: new Date(),
        task4Completion: new Date(),
    
        task5: "",
        description5: "",
        deadline5: new Date(),
        task5Completion: new Date(),
    
        response: "",
        lastResponse: "",
    }
];