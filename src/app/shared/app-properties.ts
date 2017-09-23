export enum LoginStatus {
    loggedIn,
    loggedOut,
}

export const connectionProperties = {
    baseUrl: 'http://localhost:8080',
    login: '/login',
    capture: '/devotees',
    myCapturedListUrl: '/devotees',       //my captured list - change later
    followUpDevoteeList: '/devotees', //get lis of follwups for a volunteer
}

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
}