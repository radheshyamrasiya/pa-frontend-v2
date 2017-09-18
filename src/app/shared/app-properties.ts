export enum LoginStatus {
    loggedIn,
    loggedOut,
}

export const connectionProperties = {
    baseUrl: 'http://localhost:8080',
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