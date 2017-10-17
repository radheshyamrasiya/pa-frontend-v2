export enum LoginStatus {
    loggedIn,
    loggedOut,
};

export const connectionProperties = {
    baseUrl: 'http://localhost:8080',
    login: '/login',

    //Devotee
    capture: '/devotees',
    devotees: '/devotees',
    myCapturedListUrl: '/my_captured_list',

    //History
    writeHistory: '/devoteeHistory',
    historyOf: '/devoteeHistoryByRatedDevotee',

    //Followup
    followUpDevoteeList: '/devotees', //get lis of follwups for a volunteer
};

export const callResponse = {
    coming: "Coming",
    notComing: "Not Coming",
    doubtful: "Doubtful",
    travelOut: "Travelling Outstation",
    callAgain: "Call Again",
    wrongNumber: "Wrong Number",
    removeMe: "Remove Me",
    permanentlyShifted: "Permanently Shifted",
};

export const routeConstants = {
    dashboard: 'dashboard',
    //Login Feature
    login: 'login',
    //Devotee Feature
    devoteeProfile: 'devotee-profile',
    history: 'devotee-history',
    writeComment: 'write-comment',
    paramDevoteeId: 'devoteeId',
    //Capture Feature
    captureContact: 'capture-contact',
    capturedList: 'captured-list',
    //Followup Feature
    followup: 'followup',
    followupProgram: 'followup-program',
    callResponse: 'call-response',
    //Program Feature
    myPrograms: 'my-programs',
    paramsProgramId: 'programId',
};

export const colorCode = [
    "", //value 0
    "text-white bg-danger", //value 1
    "text-white bg-danger", //value 2
    "text-white bg-warning", //value 3
    "text-white bg-info", //value 4
    "text-white bg-success", //value 5
];